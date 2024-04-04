const PersonGroup = require('../models/PersonGroup')
const Person = require('../models/Person')
const mongoose = require('mongoose')
const fs = require('fs')
const { threadId } = require('worker_threads')

// GET All People
const getGroup = async (req, res) => {
    try {
        const people = await PersonGroup.find({}).sort({ name: 1 })
        let response = {
            message: "Succesfully show all documents",
            status: "SUCCESS",
            statusCode: 200,
            numberOfDocuments: await PersonGroup.countDocuments(),
            documents: people
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

// GET A Spesific Group
const getAGroup = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id))
            throw "Invalid Mongo Id"

        const group = await PersonGroup.findOne({
            _id: id
        })

        if (!group)
            throw "There is no such a group!"

        let response = {
            message: "Success getting a group",
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

// DELETE A Spesific Group
const deleteAGroup = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id))
            throw "Invalid Mongo Id"

        const group = await PersonGroup.findByIdAndDelete(id)
        if (!group)
            throw "There is no such a group!"

        member = group.member

        let validMember = []
        for (item in member) {
            const person = await Person.findByIdAndUpdate(
                { _id: member[item] },
                { $set: { occupation: false } },
                { new: true }
            )
            validMember.push(person)
        }

        let response = {
            message: "Success deleting a group",
            status: "SUCCESS",
            statusCode: 200,
            document: group,
            member
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

// CREATE/POST A New Group
const createGroup = async (req, res) => {
    console.log("slkdmsll")
    try {
        const { member } = req.body

        if (!member)
            throw "Invalid request a group must atleast have one member"

        for (item in member) {
            const person = await Person.findById(member[item])
            if (!person)
                throw `Invalid there is no such person with id:${member[item]}`

            // asumsi bahwa groupOfPeople dikhusukan untuk mentee, staff dan kepanitian di UI
            if (person.occupation)
                throw `Invalid a person who already has occupation can't be entered a group of people`

        }


        const group = await PersonGroup.create(req.body)
        let validMember = []
        for (item in member) {
            const person = await Person.findByIdAndUpdate(
                { _id: member[item] },
                { $set: { occupation: true } },
                { new: true }
            )
            validMember.push(person)
        }
        let response = {
            message: "Succesfully create a document",
            status: "SUCCESS",
            statusCode: 200,
            document: group,
            member: validMember
        }
        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null,
            member: null
        }
        res.status(400).json(response)
    }
}

const addMember = async (req, res) => {
    try {
        const { id } = req.params
        const { member } = req.body
        if (!mongoose.isValidObjectId(id))
            throw "Invalid Mongo Id"

        // handle if there is no adding member
        if (member.length == 0)
            throw "New member must be greater than zero"

        // handle if there is duplicate in member
        validData = []
        for (index in member) {
            if (!mongoose.isValidObjectId(member[index]))
                throw "Invalid Mongo Id"

            const statusMember = await Person.findById(member[index])
            if (!statusMember)
                throw `There is no such an ${member[index]}`

            const findDuplicate = await PersonGroup.findOne({ _id: id, member: { $in: member[index] } })
            if (!findDuplicate) {
                validData.push(member[index])
            }

            if (statusMember.occupation)
                throw `Invalid a person who already has occupation can't be entered a group of people`

        }

        const process = await PersonGroup.findByIdAndUpdate(
            id,
            {
                $push: { member: validData }
            },
            { new: true }
        )

        if (!process)
            throw "There is no such a group!"


        let validMember = []
        for (item in member) {
            const person = await Person.findByIdAndUpdate(
                { _id: member[item] },
                { $set: { occupation: true } },
                { new: true }
            )
            validMember.push(person)
        }

        let response = {
            message: "Success adding person on member",
            status: "SUCCESS",
            statusCode: 200,
            document: process,
            member: validMember
        }
        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null,
            member: null
        }
        res.status(400).json(response)
    }
}

const deleteMember = async (req, res) => {
    try {
        const { id } = req.params
        const { member } = req.body
        if (!mongoose.isValidObjectId(id))
            throw "Invalid Mongo Id"

        // handle if there is no adding member
        if (member.length == 0)
            throw "list of member must be greater than zero"

        // handle if there is duplicate in member
        for (index in member) {
            if (!mongoose.isValidObjectId(member[index]))
                throw "Invalid Mongo Id"

            const statusMember = await Person.findById(member[index])
            if (!statusMember)
                throw `There is no objectId ${member[index]} on this group`

            const findDuplicate = await PersonGroup.findOne({ _id: id, member: { $in: member[index] } })
            if (!findDuplicate)
                throw "There is no such person on this group member"
        }


        const process = await PersonGroup.findByIdAndUpdate(
            id,
            {
                $pullAll: { member: member }
            },
            { new: true }
        )

        if (!process)
            throw "There is no such a group!"

        let validMember = []
        for (item in member) {
            const person = await Person.findByIdAndUpdate(
                { _id: member[item] },
                { $set: { occupation: false } },
                { new: true }
            )
            validMember.push(person)
        }
        let response = {
            message: "Success deleting person on member",
            status: "SUCCESS",
            statusCode: 200,
            document: process,
            member: validMember
        }
        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null,
            member: null
        }
        res.status(400).json(response)
    }
}

module.exports = {
    getGroup,
    getAGroup,
    deleteAGroup,
    createGroup,
    addMember,
    deleteMember
}
