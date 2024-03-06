const express = require('express')
const { createEvent, getAllEvent, getEventById, updateSchedule, addDeleteSponsor, addDeleteSpeaker, deleteAnEvent } = require('../controllers/event')
const route = express.Router()

// CREATE an event
route.post('', createEvent)

// GET all event
route.get('', getAllEvent)

// GET an event by Id
route.get('/:id', getEventById)

// UPDATE Schedule
route.patch('/updateSchedule/:id', updateSchedule)

// DELETE and ADD sponsor
route.patch('/addDeleteSponsor/:id', addDeleteSponsor)

// DELETE and ADD speaker
route.patch('/updateGroupSpeaker', addDeleteSpeaker)

// DELETE event
route.delete('/:id', deleteAnEvent)




module.exports = route