const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ScheduleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    attendance: [{
        type: Schema.ObjectId,
        required: false
    }],
    notulen: {
        type: String
    }
}, { timestamps: false, versionKey: false })

ScheduleSchema.index({ attendance: 1 })

module.exports = mongoose.model("Schedule", ScheduleSchema)