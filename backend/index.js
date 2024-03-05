require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const personRoutes = require('./routes/person')
const scheduleRoutes = require('./routes/schedule')
const coreRoutes = require('./routes/comitte/core')
const divisionRoutes = require('./routes/comitte/division')
const groupRoutes = require('./routes/group/group')
const sponsorRoutes = require('./routes/sponsor')
const eventRoutes = require('./routes/event')

// intialize the app
const app = express()


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", true);
    res.header("Access-Control-Allow-Credentials", true);
    // res.set({
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    // });
    next();
})

//middleware
app.use(express.json())

// route
app.use("/person", personRoutes)
app.use("/schedule", scheduleRoutes)
app.use("/comitte/core", coreRoutes)
app.use("/comitte/division", divisionRoutes)
app.use("/group", groupRoutes)
app.use("/sponsor", sponsorRoutes)
app.use("/event", eventRoutes)

mongoose.connect("mongodb+srv://raihan:raihan@cluster0.dn6spax.mongodb.net/?retryWrites=true&w=majority&ssl=true&appName=Cluster0")
    .then(() => {
        console.log("Connected to Mongo")
        app.listen(4000, () => {
            console.log("Listening on Port", process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })

module.exports = app