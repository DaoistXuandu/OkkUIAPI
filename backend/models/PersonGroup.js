const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    member: [{
        type: Schema.ObjectId
    }]
}, { timestamps: false, versionKey: false })

EventSchema.index({ member: 1 })

module.exports = mongoose.model("GroupPeople", EventSchema)
