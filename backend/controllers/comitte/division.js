const mongoose = require('mongoose')
const Division = require('../../models/comitte/Division')
const Person = require('../../models/Person')
const Schedule = require('../../models/Schedule')

let validDivision = new Set([
    "Project",
    "Sponsorship",
    "Kesekretariatan",
    "PSDM",
    "Acara Puncak",
    "Eksplorasi",
    "Transportasi dan Konsumsi",
    "Perizinan",
    "Logistik",
    "Keamanan",
    "Medis",
    "Media Informasi",
    "Kelembagaan",
    "Materi",
    "Mentor",
    "Media Partner",
    "IT dan Broadcast",
    "Dekorasi dan Wardrobe",
    "Visual Design dan Dokumentasi"
])

// check division member 
const checkDivisionMember = (person, validId) => {
    if (!person)
        return `There is no such a person with id ${validId} on PERSON table`
    if (!person.status)
        return "You can't set a non UI student as member of division"

    if (person.occupation)
        return `Invalid person with id:${validId} already has an occupation. You can't add a person that already has an occupation. You must set him/her not have an occupation or postion first!`

    const currentDate = new Date()
    if (person.batch == currentDate.getFullYear())
        return `A new student with id:${validId} can't become member of division!!`

    return "OK"
}

//
// CREATE a division
const createDivision = async (req, res) => {
    try {
        let {
            title,
            member,
            meet
        } = req.body

        // check title validity
        if (!validDivision.has(title)) {
            let response = "Invalid title division as it can only"
            validDivision.forEach(item => {
                response += " '" + item + "'."
            })
            throw response
        }

        const titleDuplicate = await Division.findOne({ title: title })
        if (titleDuplicate)
            throw "Division with name " + title + " already exist, try PATCH"

        // check member availibility and integrity
        if (!member.pic || !member.vpic.first || !member.vpic.second || !member.staff || member.staff.length == 0)
            throw "Invalid request body, must contain a pic, two vpic and atleast a member"

        let memberSet = new Set([])
        let status, person

        let listOfMember = JSON.parse(JSON.stringify(member.staff))
        listOfMember.push(member.pic)
        listOfMember.push(member.vpic.first)
        listOfMember.push(member.vpic.second)

        //check for every member
        for (item in listOfMember) {
            const currentId = listOfMember[item]
            if (!mongoose.isValidObjectId(currentId))
                throw "Invalid Mongo Id"
            if (memberSet.has(currentId))
                throw "Each person can only have one occupation and position"
            person = await Person.findById(currentId)
            status = checkDivisionMember(person, currentId)
            if (status !== "OK")
                throw status
            else
                memberSet.add(currentId)
        }

        // check for every meet
        let listOfMeet = []
        if (meet != undefined) {
            for (item in meet) {
                const meetId = meet[item]
                if (!mongoose.isValidObjectId(meetId))
                    throw "Invalid Mongo Id on meet request"

                const currentMeet = await Schedule.findById(meetId)
                if (!currentMeet)
                    throw "There is no such meet exist"
                listOfMeet.push(currentMeet)
            }
        }

        // create
        let division = await Division.create(req.body)
        let responseMember = []
        // change all member occupation status to true
        for (item in listOfMember) {
            const memberId = listOfMember[item]
            const changeMember = await Person.findByIdAndUpdate(
                memberId,
                { $set: { occupation: true } },
                { new: true }
            )
            responseMember.push(changeMember)
        }
        let response = {
            message: "Succesfully create a division",
            status: "SUCCESS",
            statusCode: 200,
            document: division,
            people: responseMember,
            schedule: listOfMeet
        }

        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null,
            people: null,
            schedule: null
        }
        res.status(400).json(response)
    }
}

//
// DELETE a division
const deleteDivision = async (req, res) => {
    try {
        // check valid id division
        const { id } = req.params
        if (!mongoose.isValidObjectId(id))
            throw "Invalid Mongo Id"

        // set all personId occupation to false
        const division = await Division.findById(id)
        if (!division)
            throw `There is no such division with id:${id} on DIVISION`

        let allMember = division.member.staff
        allMember.push(division.member.pic)
        allMember.push(division.member.vpic.first)
        allMember.push(division.member.vpic.second)

        // delete
        const deleteDivision = await Division.findByIdAndDelete(id)
        const person = []
        for (item in allMember) {
            const personId = allMember[item]
            const currentPerson = await Person.findByIdAndUpdate(
                personId,
                { $set: { occupation: false } },
                { new: true }
            )
            person.push(currentPerson)
        }

        let response = {
            message: "Success deleting a division",
            status: "SUCCESS",
            statusCode: 200,
            document: deleteDivision,
            person: person
        }
        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null,
            person: null
        }
        res.status(400).json(response)
    }
}

//
// GET all division
const getAllDivision = async (req, res) => {
    try {
        const division = await Division.find({}).sort({ name: 1 })
        let response = {
            message: "Succesfully show all divisions",
            status: "SUCCESS",
            statusCode: 200,
            numberOfDocuments: await Division.countDocuments(),
            documents: division
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

//
// GET only spesific division based division name
const getDivisionByName = async (req, res) => {
    try {
        const { title } = req.body
        if (!validDivision.has(title)) {
            let response = "Invalid name it must be either"
            validDivision.forEach(item => {
                response += " '" + item + "'."
            })
            throw response
        }

        const division = await Division.findOne({ title: title })

        if (!division)
            throw `Division '${title}' didn't exist`

        let response = {
            message: "Succesfully get a division",
            status: "SUCCESS",
            statusCode: 200,
            document: division
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

//
// GET only a spesific division based on id
const getDivisionById = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        if (!mongoose.isValidObjectId(id))
            throw "Invalid Mongo Id"

        const division = await Division.findById(id)

        if (!division)
            throw `Division '${id}' didn't exist`

        let response = {
            message: "Succesfully get a division",
            status: "SUCCESS",
            statusCode: 200,
            document: division
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

//
// UPDATE generally update everything
const updateDivisionById = async (req, res) => {
    try {
        const { id } = req.params
        let { title, member, meet } = req.body

        console.log(title)
        // check validitas id
        if (!mongoose.isValidObjectId(id))
            throw `Invalid Mongo Id on ${id}`

        const currentDivision = await Division.findById(id)
        if (!currentDivision)
            throw `There is no division with id:${id}`

        if (!validDivision.has(title))
            throw "Invalid Disvision name"


        // pada title, jika ada perubahan telaah apakah judul yang berubah telah ada
        if (title != undefined) {
            if (title != currentDivision.title) {
                const divisionDuplicate = await Division.findOne({ title: title })
                if (divisionDuplicate)
                    throw `There is already exist division with this '${title}' name`
            }
        }

        // pada member, jika ada perubahan cek input baru apakah valid
        // jika iya ubah semua prev-occupation jadi false
        let originalPerson = [], updatedPerson = []
        if (member != undefined) {
            listAllMember = []
            if (member.staff != undefined) {
                listAllMember = JSON.parse(JSON.stringify(member.staff))
            }
            if (member.pic != undefined)
                listAllMember.push(member.pic)
            if (member.vpic != undefined) {
                if (member.vpic.first != undefined)
                    listAllMember.push(member.vpic.first)
                if (member.vpic.second != undefined)
                    listAllMember.push(member.vpic.second)
            }

            let memberSet = new Set([])
            let status, person
            //check for every member
            for (item in listAllMember) {
                const currentId = listAllMember[item]
                if (!mongoose.isValidObjectId(currentId))
                    throw `Invalid Mongo Id:${currentId}`
                if (memberSet.has(currentId))
                    throw "Each person can only have one occupation and position"

                // if ()

                person = await Person.findById(currentId)
                status = checkDivisionMember(person, currentId)
                if (status !== "OK")
                    throw status
                else
                    memberSet.add(currentId)
            }

            // set previous person to false in occupation and new to true in occupation
            listOfPreviousMember = []
            if (member.staff != undefined)
                listOfPreviousMember = JSON.parse(JSON.stringify(currentDivision.member.staff))
            if (member.pic != undefined)
                listOfPreviousMember.push(currentDivision.member.pic)
            if (member.vpic != undefined) {
                if (member.vpic.first != undefined)
                    listOfPreviousMember.push(currentDivision.member.vpic.first)
                if (member.vpic.second != undefined)
                    listOfPreviousMember.push(currentDivision.member.vpic.second)
            }
        }

        // check meet Id validity
        let meetObject = []
        if (meet != undefined) {
            for (index in meet) {
                const meetId = meet[index]
                if (!mongoose.isValidObjectId(meetId))
                    throw `Invalid Mongo Id on ${meetId}`

                const meetStatus = await Schedule.findById(meetId)
                if (!meetStatus)
                    throw `There isn't exist a schedulle with id:${meetId}`

                meetObject.push(meetStatus)
            }
        }

        let currentMember = {
            pic: member.pic || currentDivision.member.pic,
            vpic: {
                first: (member.vpic && member.vpic.first) || currentDivision.member.vpic.first,
                second: (member.vpic && member.vpic.second) || currentDivision.member.vpic.second
            },
            staff: member.staff || currentDivision.member.staff
        }

        let currentMeet = meet || currentDivision.meet
        let currentTitle = title || currentDivision.title

        // update the entire document
        const changeDivision = await Division.findByIdAndUpdate(
            id,
            {
                $set: {
                    member: currentMember,
                    title: currentTitle,
                    meet: currentMeet
                }
            },
            { new: true }
        )

        if (member != undefined) {
            for (index in listAllMember) {
                const idMember = listAllMember[index]
                const person = await Person.findByIdAndUpdate(
                    idMember,
                    { $set: { occupation: true } },
                    { new: true }
                )
                updatedPerson.push(person)
            }

            for (index in listOfPreviousMember) {
                const idMember = listOfPreviousMember[index]
                const person = await Person.findByIdAndUpdate(
                    idMember,
                    { $set: { occupation: false } },
                    { new: true }
                )
                originalPerson.push(person)
            }
        }

        let response = {
            message: "Succesfully update a document",
            status: "SUCCESS",
            statusCode: 200,
            document: changeDivision,
            member: {
                originalPerson,
                updatedPerson
            },
            meet: meetObject
        }

        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null,
            member: null,
            meet: null
        }
        res.status(400).json(response)
    }

}

//
// ADD new staff
const addNewStaff = async (req, res) => {
    try {
        const { id } = req.params
        const { staff } = req.body
        if (!mongoose.isValidObjectId(id))
            throw "Invalid Mongo Id"

        // handle if there is no adding staff
        if (staff.length == 0)
            throw "New attendies must be greater than zero"

        // handle if there is duplicate in staff
        validData = []
        for (index in staff) {
            if (!mongoose.isValidObjectId(staff[index]))
                throw "Invalid Mongo Id"

            const staffStatus = await Person.findById(staff[index])
            if (!staffStatus)
                throw `There is no such an ${staff[index]}`

            const findDuplicate = await Division.findOne({ _id: id, "member.staff": { $in: staff[index] } })
            if (!findDuplicate) {
                if (staffStatus.occupation)
                    throw `This person with id:${staff[index]} already has occupation outise being this division staff!!`
                if (!staffStatus.status)
                    throw `This person with id:${staff[index]} not an UI student!`

                const currentDate = new Date()
                if (staffStatus.batch == currentDate.getFullYear())
                    throw `New student with id:${staff[index]} can't become a staff of a comitte!`

                validData.push(staff[index])
            }
        }

        const process = await Division.findByIdAndUpdate(
            id,
            { $push: { 'member.staff': validData } }, // Corrected structure of the update
            { new: true }
        )

        const changePerson = []
        for (index in validData) {
            const newStaff = await Person.findByIdAndUpdate(
                validData[index],
                { $set: { occupation: true } },
                { new: true }
            )
            changePerson.push(newStaff)
        }

        let response = {
            message: "Success adding person on staff",
            status: "SUCCESS",
            statusCode: 200,
            document: process,
            person: changePerson
        }
        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null,
            person: null
        }
        res.status(400).json(response)
    }
}

//
// DELETE previous staff
const deletePreviousStaff = async (req, res) => {
    try {
        const { id } = req.params
        const { staff } = req.body
        if (!mongoose.isValidObjectId(id))
            throw "Invalid Mongo Id"

        // handle if there is no adding staff
        if (staff.length == 0)
            throw "Delete request must be greater than zero"

        // handle if there is duplicate in staff
        validData = []
        for (index in staff) {
            if (!mongoose.isValidObjectId(staff[index]))
                throw "Invalid Mongo Id"

            const staffStatus = await Person.findById(staff[index])
            if (!staffStatus)
                throw `There is no such an ${staff[index]}`

            const findDuplicate = await Division.findOne({ _id: id, "member.staff": { $in: staff[index] } })
            if (findDuplicate) {
                validData.push(staff[index])
            }
            else {
                throw `There is no staff with id:${staff[index]}`
            }
        }

        const process = await Division.findByIdAndUpdate(
            id,
            { $pullAll: { 'member.staff': validData } }, // Corrected structure of the update
            { new: true }
        )

        const changePerson = []
        for (index in validData) {
            const newStaff = await Person.findByIdAndUpdate(
                validData[index],
                { $set: { occupation: false } },
                { new: true }
            )
            changePerson.push(newStaff)
        }

        let response = {
            message: "Success deleting person on staff",
            status: "SUCCESS",
            statusCode: 200,
            document: process,
            person: changePerson
        }
        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null,
            person: null
        }
        res.status(400).json(response)
    }
}

//
// ADD new meet
const addNewMeet = async (req, res) => {
    try {
        const { id } = req.params
        const { meet } = req.body
        if (!mongoose.isValidObjectId(id))
            throw "Invalid Mongo Id"

        // handle if there is no adding meet
        if (meet.length == 0)
            throw "New meet must be greater than zero"

        // handle if there is duplicate in meet
        let validData = [], meetData = []
        for (index in meet) {
            if (!mongoose.isValidObjectId(meet[index]))
                throw "Invalid Mongo Id"

            const meetStatus = await Schedule.findById(meet[index])
            if (!meetStatus)
                throw `There is no such an id:${meet[index]} on 'SCHEDULE'`

            const findDuplicate = await Division.findOne({ _id: id, meet: { $in: meet[index] } })
            if (!findDuplicate) {
                validData.push(meet[index])
                meetData.push(meetStatus)
            }
        }

        const process = await Division.findByIdAndUpdate(
            id,
            { $push: { meet: validData } }, // Corrected structure of the update
            { new: true }
        )

        let response = {
            message: "Success adding meeting on division",
            status: "SUCCESS",
            statusCode: 200,
            document: process,
            schedule: meetData
        }
        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null,
            schedule: null
        }
        res.status(400).json(response)
    }
}

// DELETE meet
const deletePreviousMeet = async (req, res) => {
    try {
        const { id } = req.params
        const { meet } = req.body
        if (!mongoose.isValidObjectId(id))
            throw "Invalid Mongo Id"

        // handle if there is no adding meet
        if (meet.length == 0)
            throw "Delete request must be greater than zero"

        // validating if query valid
        let validData = [], changeMeet = []
        for (index in meet) {
            if (!mongoose.isValidObjectId(meet[index]))
                throw "Invalid Mongo Id"

            const findDuplicate = await Division.findOne({ _id: id, meet: { $in: meet[index] } })
            const currentMeet = await Schedule.findById(meet[index])
            if (findDuplicate) {
                validData.push(meet[index])
                changeMeet.push(currentMeet)
            }
            else {
                throw `There is no meet with id:${meet[index]} on this DIVISION`
            }
        }



        const process = await Division.findByIdAndUpdate(
            id,
            { $pullAll: { meet: validData } }, // Corrected structure of the update
            { new: true }
        )

        let response = {
            message: "Success deleting meet on division",
            status: "SUCCESS",
            statusCode: 200,
            document: process,
            schedule: changeMeet
        }
        res.status(200).json(response)
    } catch (err) {
        let response = {
            message: err.message || err,
            status: "FAILED",
            statusCode: 400,
            document: null,
            schedule: null
        }
        res.status(400).json(response)
    }
}

//
// GET list of division
const getListOfDivision = async (req, res) => {
    try {
        let response = {
            message: "Succesfully getting core comitte structure",
            status: "SUCCESS",
            statusCode: 200,
            document: [
                "Project",
                "Sponsorship",
                "Kesekretariatan",
                "PSDM",
                "Acara Puncak",
                "Eksplorasi",
                "Transportasi dan Konsumsi",
                "Perizinan",
                "Logistik",
                "Keamanan",
                "Medis",
                "Media Informasi",
                "Kelembagaan",
                "Materi",
                "Mentor",
                "Media Partner",
                "IT dan Broadcast",
                "Dekorasi dan Wardrobe",
                "Visual Design dan Dokumentasi"
            ]
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
    createDivision,
    deleteDivision,
    getAllDivision,
    getDivisionByName,
    getDivisionById,
    updateDivisionById,
    addNewStaff,
    deletePreviousStaff,
    addNewMeet,
    deletePreviousMeet,
    getListOfDivision
}