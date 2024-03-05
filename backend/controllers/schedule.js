const mongoose = require('mongoose')
const Schedule = require('../models/Schedule')
const Person = require('../models/Person')

// GET all schedule
const getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find({}).sort({ starttDate: 1 })
        let response = {
            message: "Succesfully show all schedule",
            status: "SUCCESS",
            statusCode: 200,
            numberOfDocuments: await Schedule.countDocuments(),
            documents: schedules
        }
        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            numberOfDocuments: null,
            documents: null
        }
        res.status(400).json(response)
    }
}

// GET a spesific schedule
const getASchedule = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id))
            throw "Invalid Mongo Id"

        const schedule = await Schedule.findById(id)
        if (!schedule)
            throw "There is no such a schedule"

        let response = {
            message: "Succes getting a schedule",
            status: "SUCCESS",
            statusCode: 200,
            document: schedule
        }
        res.status(200).json(response)

    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null
        }
        res.status(400).json(response)
    }
}

// CREATE/POST a schedule
const createASchedule = async (req, res) => {
    try {
        let { title, place, startDate, endDate, attendance, notulen } = req.body

        if (!title)
            throw "Path 'title' must not be empty"
        if (!place)
            throw "Path 'place' must not be empty"
        if (!startDate)
            throw "Path 'startDate' must not be empty"
        if (!endDate)
            throw "Path 'endDate' must not be empty"

        const currentStartDate = new Date(startDate)
        const currentEndDate = new Date(endDate)

        if (isNaN(currentStartDate.getDate()))
            throw "Invalid date format for Path 'startDate'"
        if (isNaN(currentEndDate.getDate()))
            throw "Invalid date format for Path 'endDate'"

        if (currentStartDate.getTime() > currentEndDate.getTime())
            throw "Path 'startDate' must be earlier than Path 'endDate'"

        // check if attendance is valid
        if (attendance != undefined) {
            for (index in attendance) {
                if (!mongoose.isValidObjectId(attendance[index]))
                    throw "Invalid Mongo Id"

                const searchResult = await Person.findById(attendance[index])
                if (!searchResult)
                    throw `There is no such an ${attendance[index]} 'idPerson'`
            }
        }

        let schedule = await Schedule.create(req.body)
        let response = {
            message: "Succesfully create a documents",
            status: "SUCCESS",
            statusCode: 200,
            document: schedule
        }

        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null
        }
        res.status(400).json(response)
    }
}

// UPDATE a schedule
const updateASchedule = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id))
            throw "Invalid Mongo Id"

        let { title, place, startDate, endDate, attendance, notulen } = req.body
        let schedule = await Schedule.findById(id)

        startDate = startDate || schedule.startDate
        endDate = endDate || schedule.endDate

        const currentStartDate = new Date(startDate)
        const currentEndDate = new Date(endDate)

        if (currentStartDate.getTime() > currentEndDate.getTime())
            throw "Path 'startDate' must be earlier than PATH 'endDate'"

        if (attendance != undefined) {
            for (index in attendance) {
                if (!mongoose.isValidObjectId(attendance[index]))
                    throw "Invalid Mongo Id"

                const searchResult = await Person.findById(attendance[index])
                if (!searchResult)
                    throw `There is no such an ${attendance[index]} 'idPerson'`
            }
        }

        let changeSchedule = await Schedule.findByIdAndUpdate(
            id,
            {
                $set: {
                    title,
                    place,
                    startDate,
                    endDate,
                    attendance,
                    notulen
                }
            },
            { new: true }
        )

        let response = {
            message: "Success updating a schedule",
            status: "SUCCESS",
            statusCode: 200,
            document: changeSchedule
        }
        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null
        }
        res.status(400).json(response)
    }
}

// DELETE A Schedule
const deleteASchedule = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id))
            throw "Invalid Mongo Id"

        const schedule = await Schedule.findByIdAndDelete(id)
        if (!schedule)
            throw "There is no such a schedule!"

        let response = {
            message: "Success deleting a schedule",
            status: "SUCCESS",
            statusCode: 200,
            document: schedule
        }
        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null
        }
        res.status(400).json(response)
    }
}

// ADD new member on schedule attendance
const addMemberOnAttendance = async (req, res) => {
    try {
        const { id } = req.params
        const { attendance } = req.body
        if (!mongoose.isValidObjectId(id))
            throw "Invalid Mongo Id"

        // handle if there is no adding attendance
        if (attendance.length == 0)
            throw "New attendies must be greater than zero"

        // handle if there is duplicate in attendance
        validData = []
        for (index in attendance) {
            if (!mongoose.isValidObjectId(attendance[index]))
                throw "Invalid Mongo Id"

            const statusattendance = await Person.findById(attendance[index])
            if (!statusattendance)
                throw `There is no such an ${attendance[index]}`

            const findDuplicate = await Schedule.findOne({ _id: id, attendance: { $in: attendance[index] } })
            if (!findDuplicate) {
                validData.push(attendance[index])
            }
        }

        const process = await Schedule.findByIdAndUpdate(
            id,
            {
                $push: { attendance: validData }
            },
            { new: true }
        )

        let response = {
            message: "Success adding person on attendance",
            status: "SUCCESS",
            statusCode: 200,
            document: process
        }
        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null
        }
        res.status(400).json(response)
    }
}

// DELETE member from schedule attendance
const deleteMemberOnAttendance = async (req, res) => {
    try {
        const { id } = req.params
        const { attendance } = req.body
        if (!mongoose.isValidObjectId(id))
            throw "Invalid Mongo Id"

        // handle if there is no adding attendance
        if (attendance.length == 0)
            throw "list of attendies must be greater than zero"

        // handle if there is duplicate in attendance
        for (index in attendance) {
            if (!mongoose.isValidObjectId(attendance[index]))
                throw "Invalid Mongo Id"

            const statusattendance = await Person.findById(attendance[index])
            if (!statusattendance)
                throw `There is no objectId ${attendance[index]} on this schedule`

            const findDuplicate = await Schedule.findOne({ _id: id, attendance: { $in: attendance[index] } })
            if (!findDuplicate)
                throw "There is no such person on schedule attendance"
        }

        const process = await Schedule.findByIdAndUpdate(
            id,
            {
                $pullAll: { attendance: attendance }
            },
            { new: true }
        )

        let response = {
            message: "Success deleting person on attendance",
            status: "SUCCESS",
            statusCode: 200,
            document: process
        }
        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null
        }
        res.status(400).json(response)
    }
}

module.exports = {
    getAllSchedules,
    getASchedule,
    createASchedule,
    updateASchedule,
    deleteASchedule,
    addMemberOnAttendance,
    deleteMemberOnAttendance
}