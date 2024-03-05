const express = require('express')
const route = express.Router()

const { getAllSchedules, getASchedule, createASchedule, updateASchedule, deleteASchedule, addMemberOnAttendance, deleteMemberOnAttendance } = require('../controllers/schedule')

// get all of schedule
route.get('', getAllSchedules)

// get a spesific schedule
route.get('/:id', getASchedule)

// create a schedule
route.post('', createASchedule)

// add new attendies
route.patch('/addNewAttendies/:id', addMemberOnAttendance)

// delete member of attendies
route.patch('/deleteAttendies/:id', deleteMemberOnAttendance)

// update a schedule
route.patch('/:id', updateASchedule)

// delete a schedule
route.delete('/:id', deleteASchedule)








module.exports = route