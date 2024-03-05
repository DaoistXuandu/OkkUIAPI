const express = require('express')
const { getComitteStructure, getAllCoreMember, createCoreMember, getCoreMember, deleteCoreMember, updateCoreMember, getCoreMemberById } = require('../../controllers/comitte/core')
const route = express.Router()

// get all possible position on core comitte
route.get('/corePosition', getComitteStructure)

// get all core comitte member
route.get('/', getAllCoreMember)

// get a spesific core comitte member based on it's occupation
// input on req.body
route.get('/searchOccupation', getCoreMember)

// get a spesific core comitte member based on it's id
route.get('/:id', getCoreMemberById)

// create a core comitte position
route.post('/', createCoreMember)

// update a core comitte member
route.patch('/:id', updateCoreMember)

// delete a core comite member
route.delete('/:id', deleteCoreMember)

module.exports = route
