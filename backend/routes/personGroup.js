const express = require('express')
const { getGroup, getAGroup, deleteAGroup, deleteMember, addMember, createGroup } = require('../controllers/personGroup')
const route = express.Router()

//
// get all group
route.get('', getGroup)

//
// get id from every UI citizen
route.get('/:id', getAGroup)

// add a people
route.patch('/addMember/:id', addMember)

// delete peope
route.patch('/deleteMember/:id', deleteMember)

//
// post a person
route.post('', createGroup)

//
// post a person
route.delete('/:id', deleteAGroup)

module.exports = route
