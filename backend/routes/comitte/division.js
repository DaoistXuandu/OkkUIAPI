const express = require('express')
const { createDivision, deleteDivision, getAllDivision, getDivisionByName, getDivisionById, updateDivisionById, addNewStaff, deletePreviousStaff, addNewMeet, deletePreviousMeet, getListOfDivision } = require('../../controllers/comitte/division')
const route = express.Router()

// CREATE A division
route.post('', createDivision)

// DELETE a division
route.delete('/:id', deleteDivision)

// GET all division
route.get('', getAllDivision)

// GET list of division
route.get('/getListOfDivision', getListOfDivision)

// GET only spesific division based on name
route.patch('/searchDivision', getDivisionByName)

// GET only spesific division based on id
route.get('/:id', getDivisionById)

// UPDATE division general
route.patch('/:id', updateDivisionById)

// ADD new staff
route.patch('/addNewStaff/:id', addNewStaff)

// DELETE current staff
route.patch('/deletePreviousStaff/:id', deletePreviousStaff)

// ADD new meet
route.patch('/addNewMeet/:id', addNewMeet)

// DELETE meet
route.patch('/deletePreviousMeet/:id', deletePreviousMeet)


module.exports = route