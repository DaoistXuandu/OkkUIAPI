const mongoose = require('mongoose')
const Event = require('../models/Event')
const Person = require('../models/Person')
const Schedule = require('../models/Schedule')
const Sponsor = require('../models/Sponsor')
const Group = require('../models/group/Group')
const PersonGroup = require('../models/PersonGroup')

// CREATE an event
const createEvent = async (req, res) => {
    try {
        const { title, schedule, eventSponsor, eventSpeaker } = req.body

        // validasi
        if (!title || !schedule)
            throw "Invalid request. Request atleast must contain title and schedule"

        if (!mongoose.isValidObjectId(schedule))
            throw "Invalid id. On PATH 'schedule'"

        const getSchedule = await Schedule.findById(schedule)
        if (!getSchedule)
            throw `There is no exist schedule with id:${schedule}`

        const getGroupPeople = await PersonGroup.findById(eventSpeaker)
        if (!getGroupPeople)
            throw `There is no exist a person group with id:${eventSpeaker}`

        // validasi non - required
        let setOfSponsor = new Set()
        if (eventSponsor != undefined) {
            for (item in eventSponsor) {
                const name = eventSponsor[item].name
                const package = eventSponsor[item].package

                if (!name || !package)
                    throw "Invalid request. A sponsor must have name and package"

                const statusPackage = await Sponsor.findOne({ title: package })
                if (!statusPackage)
                    throw `Invalid request. Sponsor package with title ${package} didn't exist yet!`

                if (setOfSponsor.has({ name: package }))
                    throw `Event Sponsor with name ${name} and package ${package} already exist`

                setOfSponsor.add({ name: package })
            }
        }

        const createEvent = await Event.create(req.body)

        let response = {
            message: "Succesfully create an event",
            status: "SUCCESS",
            statusCode: 200,
            document: createEvent,
            schedule: getSchedule,
            speaker: eventSpeaker
        }
        res.status(400).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null,
            schedule: null,
            speaker: null
        }
        res.status(400).json(response)
    }
}

// GET all event
const getAllEvent = async (req, res) => {
    try {
        const event = await Event.find({})
        let response = {
            message: "Succesfully show all event",
            status: "SUCCESS",
            statusCode: 200,
            numberOfDocuments: await Event.countDocuments(),
            documents: event
        }
        res.status(200).json(response)
    }
    catch (err) {
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

// GET an event by Id
const getEventById = async (req, res) => {
    try {
        const { id } = req.params
        const event = await Event.findById(id)
        let response = {
            message: "Succesfully show this event",
            status: "SUCCESS",
            statusCode: 200,
            documents: event
        }
        res.status(200).json(response)
    }
    catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            documents: null
        }
        res.status(400).json(response)
    }
}

// UPDATE Schedule
const updateSchedule = async (req, res) => {
    try {
        const { id } = req.params
        const { schedule } = req.body

        if (!schedule)
            throw "Invalid request. There must be a new schedule to be updated"

        if (!mongoose.isValidObjectId(schedule))
            throw "Invalid schedule id"

        const scheduleStatus = await Schedule.findById(schedule)
        if (!scheduleStatus)
            throw `There is no exist schedule with id:${schedule} on 'SCHEDULE'`

        const eventUpdate = await Event.findByIdAndUpdate(
            id,
            { $set: { schedule: schedule } },
            { new: true }
        )

        let response = {
            message: "Succesfully update this schedule",
            status: "SUCCESS",
            statusCode: 200,
            document: eventUpdate,
            schedule: scheduleStatus
        }
        res.status(200).json(response)
    }
    catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null,
            schedule: null
        }
        res.status(400).json(response)
    }
}

// DELETE and ADD speaker
const addDeleteSpeaker = async (req, res) => {
    try {
        const { id } = req.params
        const { speaker } = req.body


        if (!mongoose.isValidObjectId(id))
            throw "Invalid Object Id"

        const personGroupStatus = await PersonGroup.findById(speaker)
        if (!personGroupStatus)
            throw `There is no exist a personGroup with id:${speaker} on 'PERSON GROUP'`


        let response = {
            message: "Succesfully update speaker",
            status: "SUCCESS",
            statusCode: 200,
            documents: changeSpeaker,
            speaker: personGroupStatus,
        }
        res.status(200).json(response)
    }
    catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            documents: null,
            addedSpeaker: null,
            removedSpeaker: null
        }
        res.status(400).json(response)
    }
}

const addDeleteSponsor = async (req, res) => {
    try {
        const { id } = req.params
        const { addData, deleteData } = req.body

        // check params
        if (!mongoose.isValidObjectId(id))
            throw "Invalid Id, there no such an id on MongoDB"

        let setData = new Set([])
        let validAdd = []
        if (addData != undefined && addData.length != 0) {
            for (item in addData) {
                const name = addData[item].name
                const package = addData[item].package

                const packageStatus = await Sponsor.findOne({
                    title: package
                })

                if (!packageStatus)
                    throw `Sponsor with type name ${package} didn't exist yet`

                const duplicate = await Event.findOne({
                    _id: id,
                    eventSponsor: { $elemMatch: { name: name, package: package } }
                })

                if (setData.has(addData[item]))
                    throw `There is exist duplicate in name:${name} and package:${package}`

                if (!duplicate) {
                    validAdd.push(addData[item])
                }
                setData.add(addData[item])

            }
        }

        let unsetData = new Set([])
        let validDel = []
        if (deleteData != undefined && deleteData.length != 0) {
            for (item in deleteData) {
                const name = deleteData[item].name
                const package = deleteData[item].package

                const packageStatus = await Sponsor.findOne({
                    title: package
                })

                if (!packageStatus)
                    throw `Sponsor with type name ${package} didn't exist yet`

                const duplicate = await Event.findOne({
                    _id: id,
                    eventSponsor: { $elemMatch: { name: name, package: package } }
                });

                if (unsetData.has(deleteData[item]))
                    throw `There is exist duplicate in PATH 'sponsor' name:${name} and package:${package}`

                if (setData.has(deleteData[item]))
                    throw `there is conflict of add and remove in PATH 'sponsor' name:${name} and package:${package}`

                if (duplicate) {
                    unsetData.add(deleteData[item])
                    validDel.push(duplicate.eventSponsor[item])
                }
                else
                    throw `There is no sponsor with name:${name} and package:${package} in this event sponsor`
            }
        }

        // throw validAdd
        let changeSponsor = await Event.findOneAndUpdate(
            { _id: id },
            { $pullAll: { eventSponsor: validDel } },
            { new: true }
        )

        changeSponsor = await Event.findOneAndUpdate(
            { _id: id },
            { $push: { eventSponsor: validAdd } },
            { new: true }
        )

        let response = {
            message: "Succesfully add and delete sponsor",
            status: "SUCCESS",
            statusCode: 200,
            documents: changeSponsor,
            addedSponsor: validAdd,
            removedSponsor: validDel
        }
        res.status(200).json(response)
    }
    catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            documents: null,
            addedSponsor: null,
            removedSponsor: null
        }
        res.status(400).json(response)
    }
}

const deleteAnEvent = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id))
            throw `Invalid Mongo Id. On id:${id}`

        const deleteAnEvent = await Event.findByIdAndDelete(id)
        if (!deleteAnEvent)
            throw `Invalid Event. There is no event with id:${id}`

        let response = {
            message: "Succesfully delete an event",
            status: "SUCCES",
            statusCode: 200,
            document: deleteAnEvent
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
    createEvent,
    getAllEvent,
    getEventById,
    updateSchedule,
    addDeleteSponsor,
    addDeleteSpeaker,
    deleteAnEvent
}