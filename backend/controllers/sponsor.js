const mongoose = require('mongoose')
const Sponsor = require('../models/Sponsor')

const listOfSponsor = new Set([
    "Platinum",
    "Gold",
    "Silver"
])

const createNewSponsor = async (req, res) => {
    try {
        const { title, price, benefit } = req.body

        if (!title || !price || !benefit)
            throw "Invalid request. Must contain title, price and benefit"

        // check title
        if (!listOfSponsor.has(title))
            throw "Invalid Sponsor name. Must be either 'Platinum'. 'Gold'. 'Silver'."

        const sponsorDuplicate = await Sponsor.findOne({ title: title })
        if (sponsorDuplicate)
            throw `Sponsor with name ${title} already exist try PATCH`

        // check price
        // check benefit
        if (benefit.length == 0)
            throw "Benefit must contain atleast one advantage"

        let createSponsor = await Sponsor.create({
            title,
            price,
            benefit
        })

        let response = {
            message: "Succesfully create a Sponsor",
            status: "SUCCESS",
            statusCode: 200,
            document: createSponsor,
        }
        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null,
        }
        res.status(400).json(response)
    }
}

// GET All sponsor
const getAllSponsor = async (req, res) => {
    try {
        const sponsor = await Sponsor.find({})
        let response = {
            message: "Succesfully get all sponsor",
            status: "SUCCESS",
            statusCode: 200,
            document: sponsor,
            numberOfDocuments: await Sponsor.countDocuments()
        }
        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null,
            numberOfDocuments: null
        }
        res.status(400).json(response)
    }
}

// GET sponsor based on it's name
const getSponsorByName = async (req, res) => {
    try {
        const { title } = req.body

        if (!listOfSponsor.has(title))
            throw "Invalid Sponsor name. Must be either 'Platinum'. 'Gold'. 'Silver'."

        const sponsor = await Sponsor.findOne({ title: title })
        if (!sponsor)
            throw `Sponsor with name ${title} didn't exist yet.`
        let response = {
            message: "Succesfully get a sponsor",
            status: "SUCCESS",
            statusCode: 200,
            document: sponsor
        }
        res.status(400).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null,
        }
        res.status(400).json(response)
    }
}

// UPDATE Price
const updatePrice = async (req, res) => {
    try {
        const { title, price } = req.body

        if (!price || !title)
            throw "Invalid request. Update request must contain price and title"
        if (!listOfSponsor.has(title))
            throw "Invalid Sponsor name. Must be either 'Platinum'. 'Gold'. 'Silver'."


        const sponsor = await Sponsor.findOneAndUpdate(
            { title: title },
            { $set: { price: price } },
            { new: true }
        )

        let response = {
            message: "Succesfully update price",
            status: "SUCCESS",
            statusCode: 200,
            document: sponsor,
        }
        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null,
        }
        res.status(400).json(response)
    }
}

// Add Benefit
const addBenefit = async (req, res) => {
    try {
        const { title, benefit } = req.body
        if (!title)
            throw "Invalid request. request must contain title"
        if (!listOfSponsor.has(title))
            throw "Invalid request. request must contain title"

        if (benefit == undefined || benefit.length == 0)
            throw "Invalid request. Path 'Benefit' must contain atleast on benefit"

        const sponsorBenefit = await Sponsor.findOne(
            { title: title },
        )

        if (!sponsorBenefit)
            throw `There is no sponsor with name ${title} yet`

        let validData = []
        for (index in benefit) {
            const findDuplicate = await Sponsor.findOne({ title: title, benefit: { $in: benefit[index] } })
            if (!findDuplicate) {
                validData.push(benefit[index])
            }
        }

        const updatedSponsor = await Sponsor.findOneAndUpdate(
            { title: title },
            { $push: { benefit: validData } },
            { new: true }
        )

        let response = {
            message: "Succesfully get all sponsor",
            status: "SUCCESS",
            statusCode: 200,
            document: updatedSponsor
        }
        res.status(400).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null,
        }
        res.status(400).json(response)
    }
}

// Remove Benefit
const removeBenefit = async (req, res) => {
    try {
        const { title, benefit } = req.body
        if (!title)
            throw "Invalid request. request must contain title"
        if (!listOfSponsor.has(title))
            throw "Invalid request. request must contain title"

        if (benefit == undefined || benefit.length == 0)
            throw "Invalid request. Path 'Benefit' must contain atleast on benefit"

        const sponsorBenefit = await Sponsor.findOne(
            { title: title },
        )

        if (!sponsorBenefit)
            throw `There is no sponsor with name ${title} yet`

        let validData = []
        for (index in benefit) {
            const findDuplicate = await Sponsor.findOne({ title: title, benefit: { $in: benefit[index] } })
            if (findDuplicate) {
                validData.push(benefit[index])
            }
            else {
                throw `There is no benefit that contain '${benefit[index]}' on '${title}' sponsor`
            }
        }

        const updatedSponsor = await Sponsor.findOneAndUpdate(
            { title: title },
            { $pullAll: { benefit: validData } },
            { new: true }
        )

        let response = {
            message: "Succesfully get all sponsor",
            status: "SUCCESS",
            statusCode: 200,
            document: updatedSponsor
        }
        res.status(400).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null,
        }
        res.status(400).json(response)
    }
}

// DELETE Sponsor
const deleteSponsor = async (req, res) => {
    try {
        const { title } = req.body

        if (!title)
            throw "Invalid request. request must contain title"
        if (!listOfSponsor.has(title))
            throw "Invalid request. request must contain title"

        const sponsor = await Sponsor.findOneAndDelete(
            { title: title },
        )

        if (!sponsor)
            throw `There is no exist sponsor with name ${title} on 'SPONSOR'`

        let response = {
            message: "Succesfully get all sponsor",
            status: "SUCCESS",
            statusCode: 200,
            document: sponsor
        }
        res.status(400).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null,
        }
        res.status(400).json(response)
    }
}

const getListOfSponsor = async (req, res) => {
    try {
        let response = {
            message: "Succesfully get all sponsor",
            status: "SUCCESS",
            statusCode: 200,
            document: [
                "Platinum",
                "Gold",
                "Silver"
            ],
        }
        res.status(400).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null,
        }
        res.status(400).json(response)
    }
}

module.exports = {
    createNewSponsor,
    getAllSponsor,
    getSponsorByName,
    updatePrice,
    addBenefit,
    removeBenefit,
    deleteSponsor,
    getListOfSponsor
}