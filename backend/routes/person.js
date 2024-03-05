const express = require('express')
const route = express.Router()

const { getPeople, createPerson, getPerson, deletePerson, updatePerson, getValidEntryProcess, getUIStudents, getNonUIStudents } = require('../controllers/person')


// get all people
route.get('', getPeople)

// get id from every UI citizen
route.get('/getUIStudents', getUIStudents)

// get id from every non-UI citizen
route.get('/getNonUIStudents', getNonUIStudents)

// get valid entrance process
route.get('/entry-validity', getValidEntryProcess)

// get a single person
route.get('/:id', getPerson)

// delete a single person
route.delete('/:id', deletePerson)

// update a single person
route.patch('/:id', updatePerson)

// post a person
route.post('', createPerson)


module.exports = route