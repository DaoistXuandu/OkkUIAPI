const Person = require('../models/Person')
const mongoose = require('mongoose')
const fs = require('fs')

const validEntryProcess = new Set(["SNBP", "SNBT", "SIMAK", "PPKB", "Talent Scouting"])

// GET All People
const getPeople = async (req, res) => {
    try {
        const people = await Person.find({}).sort({ name: 1 })
        let response = {
            message: "Succesfully show all documents",
            status: "SUCCESS",
            statusCode: 200,
            numberOfDocuments: await Person.countDocuments(),
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

// GET A Spesific Person
const getPerson = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id))
            throw "Invalid Mongo Id"

        const person = await Person.findOne({
            _id: id
        })

        if (!person)
            throw "There is no such a person!"

        let response = {
            message: "Success getting a person",
            status: "SUCCESS",
            statusCode: 200,
            document: person
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

// GET All Id and occupation status From every UI students
const getUIStudents = async (req, res) => {
    try {
        const students = await Person
            .find({ status: true }, { _id: 1, occupation: 1 })
        let response = {
            message: "Succesfully show all documents",
            status: "SUCCESS",
            statusCode: 200,
            numberOfDocuments: await Person.countDocuments({ status: true }),
            documents: students
        }
        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            numberOfDocuments: null,
            document: null
        }
        res.status(400).json(response)
    }
}

// get all id and occupation status from non-UI students
const getNonUIStudents = async (req, res) => {
    try {
        const students = await Person
            .find({ status: false }, { _id: 1, occupation: 1 })
        let response = {
            message: "Succesfully show all documents",
            status: "SUCCESS",
            statusCode: 200,
            numberOfDocuments: await Person.countDocuments({ status: false }),
            documents: students
        }
        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            numberOfDocuments: null,
            document: null
        }
        res.status(400).json(response)
    }
}


// DELETE A Spesific Person
const deletePerson = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id))
            throw "Invalid Mongo Id"

        const person = await Person.findByIdAndDelete(id)
        if (!person)
            throw "There is no such a person!"

        let response = {
            message: "Success deleting a person",
            status: "SUCCESS",
            statusCode: 200,
            document: person
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

// CREATE/POST A New Person
const createPerson = async (req, res) => {
    try {
        let { name, status, faculty, major, batch, entryProcess, occupation } = req.body
        if (occupation)
            throw "Occupation can't be added when first created"
        else
            occupation = false

        let person = null
        if (status == true) {
            let currentDate = new Date

            if (!name || !faculty || !major || !batch || !entryProcess) {
                let response = "Person validation failed:"
                if (!faculty)
                    response += " Path 'faculty' required."
                if (!name)
                    response += " Path 'name' required."

                if (!major)
                    response += " Path 'major' required."
                if (!batch)
                    response += " Path 'batch' required."
                if (!entryProcess)
                    response += " Path 'entryProcess' required."

                throw response
            }

            if (req.body.batch > currentDate.getFullYear())
                throw "Batch can't be greater than curent year"

            if (!validEntryProcess.has(entryProcess)) {
                let response = "Invalid entry process as it can only "
                validEntryProcess.forEach(item => {
                    response += "'" + item + "'"
                    response += " "
                })

                throw response
            }

            person = await Person.create({
                name,
                status,
                faculty,
                major,
                batch,
                entryProcess,
                occupation
            })

        }
        else {
            console.log(1)
            person = await Person.create({
                name,
                status,
                occupation
            })
        }

        let response = {
            message: "Succesfully create a document",
            status: "SUCCESS",
            statusCode: 200,
            document: person
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

// UPDATE A Person
const updatePerson = async (req, res) => {
    try {
        const { id } = req.params
        let { name, status, faculty, major, batch, entryProcess, occupation } = req.body
        if (!mongoose.isValidObjectId(id))
            throw "Invalid Mongo Id"

        const currentDate = new Date()
        const person = await Person.findOne({ _id: id })

        if (!person)
            throw "There is no such a person!"

        if (batch != undefined && batch != person.batch && batch == currentDate.getFullYear()) {
            if (person.occupation == true)
                throw "Person who has occupation in Comitte or mentoring can't be enter UI in the current year"
        }

        if (batch > currentDate.getFullYear())
            throw "Batch can't be greater than curent year"

        if (status != undefined && status != person.status) {
            if (status) {
                if (faculty == undefined || major == undefined || batch == undefined || entryProcess == undefined) {
                    let response = "Person validation failed: To update as UI citizen"
                    if (!faculty)
                        response += " Path 'faculty' required."
                    if (!major)
                        response += " Path 'major' required."
                    if (!batch)
                        response += " Path 'batch' required."
                    if (!entryProcess)
                        response += " Path 'entryProcess' required."

                    throw response
                }
            }
        }

        let changeSet = {}, changeUnset = {};

        if (entryProcess != undefined && !validEntryProcess.has(entryProcess)) {
            let response = "Invalid entry process as it can only "
            validEntryProcess.forEach(item => {
                response += "'" + item + "'"
                response += " "
            })

            throw response
        }

        if (status == false || (person.status == false && status == undefined)) {
            changeSet = {
                name,
                status,
                occupation
            }

            changeUnset = {
                faculty,
                major,
                batch,
                entryProcess
            }
        }
        else {
            changeSet = {
                name,
                status,
                faculty,
                major,
                batch,
                entryProcess,
                occupation
            }
        }

        const process = await Person.findByIdAndUpdate(
            id,
            {
                $set: changeSet,
                $unset: changeUnset
            },
            { new: true })

        let response = {
            message: "Success updating a person",
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

const getValidEntryProcess = (req, res) => {
    try {
        let response = {
            message: "Succesfully getting valid entry",
            status: "SUCCES",
            statusCode: 200,
            document: ["SNBP", "SNBT", "SIMAK", "PPKB", "Talent Scouting"]
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

module.exports = {
    getPeople,
    getPerson,
    deletePerson,
    updatePerson,
    createPerson,
    getValidEntryProcess,
    getUIStudents,
    getNonUIStudents
}