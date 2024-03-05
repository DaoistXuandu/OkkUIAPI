const Core = require('../../models/comitte/Core')
const Person = require('../../models/Person')
const mongoose = require('mongoose')

const setComitteStructure = new Set([
    "Project Officer",
    "VPO Internal",
    "VPO Eksternal",
    "Sekertaris Umum",
    "Controller",
    "Treasurer",
    "Koordinator Acara",
    "Koordinator Sarana Prasarana",
    "Koordinator Operational",
    "Koordinator Materi dan Mentor",
    "Koordinator Kreatif",
    "Koordinator Relasi"
])


// GET Core Comitte Structure
const getComitteStructure = async (req, res) => {
    try {
        let response = {
            message: "Succesfully getting core comitte structure",
            status: "SUCCESS",
            statusCode: 200,
            document: [
                "Project Officer",
                "VPO Internal",
                "VPO Eksternal",
                "Sekertaris Umum",
                "Controller",
                "Treasurer",
                "Koordinator Acara",
                "Koordinator Sarana Prasarana",
                "Koordinator Operational",
                "Koordinator Materi dan Mentor",
                "Koordinator Kreatif",
                "Koordinator Relasi"
            ]
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

// GET All core member 
const getAllCoreMember = async (req, res) => {
    try {
        const member = await Core.find({})
        let response = {
            message: "Succesfully show all documents",
            status: "SUCCESS",
            statusCode: 200,
            numberOfDocuments: await Core.countDocuments(),
            documents: member
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
        res.status(200).json(response)
    }
}

// GET core member by id
const getCoreMemberById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.isValidObjectId(id))
            throw "Invalid Mongo Id"

        const member = await Core.findById(id)
        if (!member)
            throw "There is no such a member on 'CORE'"

        let response = {
            message: "Succesfully show a member",
            status: "SUCCESS",
            statusCode: 200,
            document: member
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

// GET a spesific member
const getCoreMember = async (req, res) => {
    try {
        const { occupation } = req.body

        if (!setComitteStructure.has(occupation)) {
            let response = "Invalid occupation it must be either"
            setComitteStructure.forEach(item => {
                response += " '" + item + "'."
            })
            throw response
        }

        const member = await Core.findOne({ occupation: occupation })
        let response = {
            message: "Succesfully get a member",
            status: "SUCCESS",
            statusCode: 200,
            document: member
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

// CREATE/POST a core member
const createCoreMember = async (req, res) => {
    try {
        let { personId, occupation } = req.body

        if (!mongoose.isValidObjectId(personId))
            throw "Invalid Mongo Id"

        const person = await Person.findById(personId)
        if (!person)
            throw `There is no such a person with id ${personId} on PERSON table`

        if (person.occupation)
            throw "This person already has occupation."

        const currentDate = new Date()
        if (person.batch == currentDate.getFullYear())
            throw "New student can't become a core comitte"

        if (!person.status)
            throw "Only UI Student can become core comitte member"

        if (!setComitteStructure.has(occupation)) {
            let response = "Invalid occupation it must be either"
            setComitteStructure.forEach(item => {
                response += " '" + item + "'."
            })
            throw response
        }

        const occupationValidity = await Core.findOne({ occupation: occupation })
        if (occupationValidity)
            throw "Such occupation already exist. Try PATCH!"

        const process = await Core.create({ personId, occupation })
        const personProcess = await Person.findOneAndUpdate(
            { _id: personId },
            {
                $set: {
                    occupation: true
                }
            },
            { new: true }
        )

        let response = {
            message: "Succesfully create a document",
            status: "SUCCESS",
            statusCode: 200,
            document: process,
            person: personProcess
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
        res.status(400).json(response)
    }
}

// UPDATE/PATCH a core member
const updateCoreMember = async (req, res) => {
    try {
        const { id } = req.params
        let { personId, occupation } = req.body

        const member = await Core.findById(id)
        const currentPerson = await Person.findById(personId)

        let arrayPerson = []

        if (personId != undefined) {
            if (!mongoose.isValidObjectId(personId))
                throw "Invalid Mongo Id"

            if (member.personId != personId) {
                if (currentPerson.occupation)
                    throw "This person already has an occupation"

                if (!currentPerson.status)
                    throw "Only UI Student can become core comitte member"

                const currentDate = new Date()
                if (currentPerson.batch == currentDate.getFullYear())
                    throw "New student can't become a core comitte"
            }
        }

        if (occupation != undefined) {
            if (occupation != member.occupation) {
                if (!setComitteStructure.has(occupation)) {
                    let response = "Invalid occupation it must be either"
                    setComitteStructure.forEach(item => {
                        response += " '" + item + "'."
                    })
                    throw response
                }

                const availability = await Core.findOne({ occupation: occupation })
                if (availability)
                    throw "Such occupation already exist. Try PATCH on the exact occupation"
            }
        }

        const changeMember = await Core.findByIdAndUpdate(
            id,
            { $set: { personId, occupation } },
            { new: true }
        )

        const statusMember = await Person.findByIdAndUpdate(
            member.personId,
            {
                $set: { occupation: false },
            },
            { new: true })

        arrayPerson.push(statusMember)

        const statusCurrentPerson = await Person.findByIdAndUpdate(
            personId,
            {
                $set: { occupation: true },
            },
            { new: true }
        )

        arrayPerson.push(statusCurrentPerson)

        let response = {
            message: "Succesfully update a document",
            status: "SUCCESS",
            statusCode: 200,
            document: changeMember,
            person: arrayPerson
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
        res.status(400).json(response)
    }

}

// DELETE a member
const deleteCoreMember = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id))
            throw "Invalid Mongo Id"

        const member = await Core.findById(id)
        if (!member)
            throw "There is no such a member"


        const responseMember = await Core.findByIdAndDelete(id)
        const responsePerson = await Person.findByIdAndUpdate(
            member.personId,
            {
                $set:
                    { occupation: false }
            },
            { new: true }
        )

        let response = {
            message: "Succesfully delete a member",
            status: "SUCCESS",
            statusCode: 200,
            document: responseMember,
            person: responsePerson
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
        res.status(400).json(response)
    }
}

module.exports = {
    getComitteStructure,
    getCoreMember,
    getAllCoreMember,
    getCoreMemberById,
    createCoreMember,
    deleteCoreMember,
    updateCoreMember
}
