const express = require('express')
const { createNewSponsor, getAllSponsor, getSponsorByName, updatePrice, addBenefit, removeBenefit, deleteSponsor, getListOfSponsor } = require('../controllers/sponsor')
const route = express.Router()

//
// CREATE a new Sponsor
route.post('', createNewSponsor)

//
// GET All Sponsort
route.get('', getAllSponsor)

//
// GET list Sponsor
route.get('/getListSponsor', getListOfSponsor)

//
// GET Sponsor based of its name
route.patch('/searchName', getSponsorByName)

//
// UPDATE harga
route.patch('/updatePrice', updatePrice)

//
// Add Benefit
route.patch('/addBenefit', addBenefit)

//
// delete benefit
route.patch('/removeBenefit', removeBenefit)

//
// DELETE Sponsor
route.delete('/deleteSponsor', deleteSponsor)


module.exports = route