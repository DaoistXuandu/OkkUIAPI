const mongoose = require('mongoose')
const Group = require('../../models/group/Group')
const Person = require('../../models/Person')
const Schedule = require('../../models/Schedule')
const { route } = require('../../routes/person')


// CREATE A Group
const createAGroup = async (req, res) => {
    try {
        const {
            mentor,
            mentees,
            schedules
        } = req.body

        // validate mentor and mentees request
        if (!mentor)
            throw "Invalid request. Must initialize a mentor"
        if (mentees == undefined || mentees.length == 0)
            throw "Invalid request. Must initailize atleast a mentee"
        let validGroupMember = []
        let setGroup = new Set([])
        // check for mentor
        if (!mongoose.isValidObjectId(mentor))
            throw `Invalid Mongo Id. id:${mentor} is invalid`

        const mentorData = await Person.findById(mentor)
        if (!mentorData)
            throw `There isn't exist id:${mentor} on 'PERSON'`
        if (mentorData.occupation)
            throw `Invalid Person at id:${mentorData._id}. To get assigned in a any new occupation a person musn't be assigned to another occupation!`

        const currentDate = new Date()
        if (mentorData.batch == currentDate.getFullYear())
            throw `Invalid Person at id:${mentorData._id}. New student not permitted to become a mentor`
        if (!mentorData.status)
            throw `Invalid Person at id:${mentorData._id}. Mentor must be a senior student in UI`

        setGroup.add(mentorData)
        validGroupMember.push(mentorData)
        // check for mentees
        for (index in mentees) {
            const menteeId = mentees[index]
            const menteeData = await Person.findById(menteeId)

            if (!menteeData)
                throw `There isn't exist id:${mentor} on 'PERSON'`

            if (setGroup.has(menteeId))
                throw `Invalid Person can only have one occupation!`

            if (menteeData.occupation)
                throw `Invalid Person at id:${menteeData._id}. To get assigned in a any new occupation a person musn't be assigned to another occupation!"`

            if (!menteeData.status)
                throw `Invalid Person at id:${menteeData._id}. Mentee must be a student in UI`

            validGroupMember.push(mentees[index])
            setGroup.add(menteeId)
        }

        // check for meet 
        let listOfschedules = []
        if (schedules != undefined) {
            for (item in schedules) {
                const schedulesId = schedules[item]
                if (!mongoose.isValidObjectId(schedulesId))
                    throw "Invalid Mongo Id on schedules request"

                const currentSchedules = await Schedule.findById(schedulesId)
                if (!currentSchedules)
                    throw "There is no such schedules exist"
                listOfschedules.push(currentSchedules)
            }
        }

        // get group number
        let groupNumber = await Group.findOne({}).sort({ group: -1 })
        groupNumber = groupNumber.group
        groupNumber += 1
        // throw groupNumber.group

        const group = await Group.create({
            group: groupNumber,
            ...req.body
        })
        let infoPerson = []
        for (index in validGroupMember) {
            const statusMember = await Person.findByIdAndUpdate(
                validGroupMember[index],
                { $set: { occupation: true } },
                { new: true }
            )
            infoPerson.push(statusMember)
        }

        let response = {
            message: "Succesfully create a  Group",
            status: "SUCCESS",
            statusCode: 200,
            document: group,
            people: infoPerson,
            schedules: listOfschedules
        }
        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null,
            people: null,
            schedules: null
        }
        res.status(400).json(response)
    }
}

// GET ALL Group
const getAllGroup = async (req, res) => {
    try {
        const group = await Group.find({}).sort({ group: -1 })
        let response = {
            message: "Succesfully show all group",
            status: "SUCCESS",
            statusCode: 200,
            numberOfDocuments: await Group.countDocuments(),
            documents: group
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

// GET Group based on it's number
const getGroupBasedId = async (req, res) => {
    try {
        const { id } = req.params
        const group = await Group.findById(id)
        let response = {
            message: "Succesfully found this group",
            status: "SUCCESS",
            statusCode: 200,
            document: group
        }
        res.status(200).json(response)
    }
    catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null
        }
        res.status(400).json(response)
    }
}

// GET Group based on it's number
const getGroupBasedNumber = async (req, res) => {
    try {
        const { number } = req.body
        if (typeof number !== 'number')
            throw "Invalid query. Request must be a number"

        const group = await Group.findOne({ group: number })

        if (!group)
            throw `Group number '${number}' didn't exist`

        let response = {
            message: "Succesfully get a group",
            status: "SUCCESS",
            statusCode: 200,
            document: group
        }
        res.status(200).json(response)

    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null
        }
        res.status(200).json(response)
    }
}

// DELETE Group
const deleteGroup = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id))
            throw `Invalid Id on id:${id}`

        let listOfGroupMember = []
        const group = await Group.findById(id)
        if (!group)
            throw `Invalid group with id:${id} didnt exit on 'GROUP'`

        listOfGroupMember.push(group.mentor)
        group.mentees.forEach(item => {
            listOfGroupMember.push(item)
        })

        const groupStatus = await Group.findByIdAndDelete(id)
        let listOfMemberStatus = []
        for (index in listOfGroupMember) {
            const person = await Person.findByIdAndUpdate(
                listOfGroupMember[index],
                { $set: { occupation: false } },
                { new: true }
            )
            listOfMemberStatus.push(person)
        }

        let response = {
            message: "Success deleting a group",
            status: "SUCCESS",
            statusCode: 200,
            document: groupStatus,
            people: listOfMemberStatus
        }
        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null,
            people: null
        }
        res.status(400).json(response)
    }
}

// CHANGE Mentor
const changeMentor = async (req, res) => {
    try {
        const { id } = req.params
        const { mentor } = req.body
        if (!mongoose.isValidObjectId(mentor))
            throw `Invalid Id on id:${id}`

        if (!mongoose.isValidObjectId(id))
            throw `Invalid Id on id:${id}`


        const person = await Person.findById(mentor)
        if (!person)
            throw `Invalid person with id:${person} didn't exist in 'PERSON'`

        if (person.occupation)
            throw `Invalid Person at id:${person._id}. To get assigned in a any new occupation a person musn't be assigned to another occupation!`

        const currentDate = new Date()
        if (person.batch == currentDate.getFullYear())
            throw `Invalid Person at id:${person._id}. New student not permitted to become a mentor`

        if (!person.status)
            throw `Invalid Person at id:${person._id}. Mentor must be a senior student in UI`

        const group = await Group.findById(id)
        const changeMentor = await Group.findByIdAndUpdate(
            id,
            { $set: { mentor: person.id } },
            { new: true }
        )

        let listOfChange = []
        let changePeople = await Person.findByIdAndUpdate(
            group.mentor,
            { $set: { occupation: false } },
            { new: true }
        )
        listOfChange.push(changePeople)

        changePeople = await Person.findByIdAndUpdate(
            person._id,
            { $set: { occupation: true } },
            { new: true }
        )
        listOfChange.push(changePeople)

        let response = {
            message: "Success updating a group mentor",
            status: "SUCCESS",
            statusCode: 200,
            document: changeMentor,
            person: listOfChange
        }
        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null,
            person: null
        }
        res.status(200).json(response)
    }
}

const addNewMentee = async (req, res) => {
    try {
        const { id } = req.params
        const { mentees } = req.body
        if (!mongoose.isValidObjectId(id))
            throw "Invalid Mongo Id"

        // handle mentess zero
        if (mentees == undefined || mentees.length == 0)
            throw "New mentees must be greater than zero"



        // handle if there is duplicate in mentees
        validData = []
        for (index in mentees) {
            if (!mongoose.isValidObjectId(mentees[index]))
                throw "Invalid Mongo Id"

            const menteeStatus = await Person.findById(mentees[index])
            if (!menteeStatus)
                throw `There is no such an ${mentees[index]}`

            const findDuplicate = await Group.findOne({ _id: id, mentees: { $in: mentees[index] } })
            if (!findDuplicate) {
                if (menteeStatus.occupation)
                    throw `This person with id:${mentees[index]} already has occupation outise being this group!!`
                if (!menteeStatus.status)
                    throw `This person with id:${mentees[index]} not an UI student!!`
                validData.push(mentees[index])
            }
        }

        const process = await Group.findByIdAndUpdate(
            id,
            { $push: { mentees: validData } }, // Corrected structure of the update
            { new: true }
        )

        const changePerson = []
        for (index in validData) {
            const newMentee = await Person.findByIdAndUpdate(
                validData[index],
                { $set: { occupation: true } },
                { new: true }
            )
            changePerson.push(newMentee)
        }

        let response = {
            message: "Success adding mentee on group",
            status: "SUCCESS",
            statusCode: 200,
            document: process,
            people: changePerson
        }
        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null,
            people: null
        }
        res.status(400).json(response)
    }
}

// DELETE previous staff
const deletePreviousMentees = async (req, res) => {
    try {
        const { id } = req.params
        const { mentees } = req.body
        if (!mongoose.isValidObjectId(id))
            throw "Invalid Mongo Id"

        // handle if there is no adding mentees
        if (mentees == undefined || mentees.length == 0)
            throw "Delete request must be greater than zero"

        // handle if there is duplicate in mentees
        validData = []
        for (index in mentees) {
            if (!mongoose.isValidObjectId(mentees[index]))
                throw "Invalid Mongo Id"

            const menteesStatus = await Person.findById(mentees[index])
            if (!menteesStatus)
                throw `There is no such an ${mentees[index]}`

            const findDuplicate = await Group.findOne({ _id: id, mentees: { $in: mentees[index] } })
            if (findDuplicate) {
                validData.push(mentees[index])
            }
            else {
                throw `There is no mentees with id:${mentees[index]}`
            }
        }

        const process = await Group.findByIdAndUpdate(
            id,
            { $pullAll: { mentees: validData } }, // Corrected structure of the update
            { new: true }
        )

        const changePerson = []
        for (index in validData) {
            const newMentee = await Person.findByIdAndUpdate(
                validData[index],
                { $set: { occupation: false } },
                { new: true }
            )
            changePerson.push(newMentee)
        }

        let response = {
            message: "Success deleting person on mentee",
            status: "SUCCESS",
            statusCode: 200,
            document: process,
            people: changePerson
        }
        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null,
            people: null
        }
        res.status(400).json(response)
    }
}

// ADD new meet
const addNewSchedule = async (req, res) => {
    try {
        const { id } = req.params
        const { schedules } = req.body
        if (!mongoose.isValidObjectId(id))
            throw "Invalid Mongo Id"

        // handle if there is no adding schedules
        if (schedules == undefined || schedules.length == 0)
            throw "New schedules must be greater than zero"

        // handle if there is duplicate in schedules
        let validData = [], schedulesData = []
        for (index in schedules) {
            if (!mongoose.isValidObjectId(schedules[index]))
                throw "Invalid Mongo Id"

            const schedulesStatus = await Schedule.findById(schedules[index])
            if (!schedulesStatus)
                throw `There is no such an id:${schedules[index]} on 'SCHEDULE'`

            const findDuplicate = await Group.findOne({ _id: id, schedules: { $in: schedules[index] } })
            if (!findDuplicate) {
                validData.push(schedules[index])
                schedulesData.push(schedulesStatus)
            }
        }

        const process = await Group.findByIdAndUpdate(
            id,
            { $push: { schedules: validData } }, // Corrected structure of the update
            { new: true }
        )

        let response = {
            message: "Success adding schedules on Group",
            status: "SUCCESS",
            statusCode: 200,
            document: process,
            schedules: schedulesData
        }
        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null,
            schedules: null
        }
        res.status(400).json(response)
    }
}

// DELETE meet
const deleteSchedules = async (req, res) => {
    try {
        const { id } = req.params
        const { schedules } = req.body
        if (!mongoose.isValidObjectId(id))
            throw "Invalid Mongo Id"

        // handle if there is no adding schedules
        if (schedules == undefined || schedules.length == 0)
            throw "Delete request must be greater than zero"

        // validating if query valid
        let validData = [], changeSchedules = []
        for (index in schedules) {
            if (!mongoose.isValidObjectId(schedules[index]))
                throw "Invalid Mongo Id"

            const findDuplicate = await Group.findOne({ _id: id, schedules: { $in: schedules[index] } })
            const currentSchedules = await Schedule.findById(schedules[index])
            if (findDuplicate) {
                validData.push(schedules[index])
                changeSchedules.push(currentSchedules)
            }
            else {
                throw `There is no schedules with id:${schedules[index]} on this 'GROUP'`
            }
        }

        const process = await Group.findByIdAndUpdate(
            id,
            { $pullAll: { schedules: validData } }, // Corrected structure of the update
            { new: true }
        )

        let response = {
            message: "Success deleting schedule on Group",
            status: "SUCCESS",
            statusCode: 200,
            document: process,
            schedules: changeSchedules
        }
        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null,
            schedules: null
        }
        res.status(400).json(response)
    }
}

module.exports = {
    createAGroup,
    getAllGroup,
    getGroupBasedId,
    getGroupBasedNumber,
    deleteGroup,
    changeMentor,
    addNewMentee,
    deletePreviousMentees,
    addNewSchedule,
    deleteSchedules
}