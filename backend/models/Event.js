const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    schedule: {
        type: Schema.ObjectId,
        required: true
    },
    eventSponsor: [{
        name: String,
        package: String
    }],
    eventSpeaker: { type: Schema.ObjectId }

}, { timestamps: false, versionKey: false })

EventSchema.index({ eventSponsor: 1 })

module.exports = mongoose.model("Event", EventSchema)