const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PersonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    faculty: {
        type: String,
    },
    major: {
        type: String,
    },
    batch: {
        type: Number,
    },
    entryProcess: {
        type: String,
    },
    occupation: {
        type: Boolean,
        required: true
    }
}, { timestamps: false, versionKey: false })

PersonSchema.index({ _id: 1 })

module.exports = mongoose.model("Person", PersonSchema)
