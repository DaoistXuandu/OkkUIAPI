const express = require('express')
const { createAGroup, getAllGroup, getGroupBasedId, getGroupBasedNumber, deleteGroup, changeMentor, addNewMentee, deletePreviousMentees, addNewSchedule, deleteSchedules } = require('../../controllers/group/group')
const route = express.Router()

// CREATE A Group
route.post('', createAGroup)

// GET ALL Group
route.get('', getAllGroup)

// GET Group based on it's number
route.get('/searchGroupNumber', getGroupBasedNumber)

// GET Group based on it's id
route.get('/:id', getGroupBasedId)

// DELETE Group
route.delete('/:id', deleteGroup)

// CHANGE Mentor
route.patch('/changeMentor/:id', changeMentor)

// ADD Mentee
route.patch('/addNewMentee/:id', addNewMentee)

// DELETE Mentee
route.patch('/deleteMentee/:id', deletePreviousMentees)

// ADD Schedule
route.patch('/addNewSchedules/:id', addNewSchedule)

// DELETE Schedule
route.patch('/deleteSchedules/:id', deleteSchedules)

module.exports = route