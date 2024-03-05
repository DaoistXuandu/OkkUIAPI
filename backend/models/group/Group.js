const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupSchema = new Schema({
    group: {
        type: Number,
        required: true
    },
    mentor: {
        type: Schema.ObjectId,
        required: true
    },
    mentees: [{
        type: Schema.ObjectId,
        required: true
    }],
    schedules: [{
        type: Schema.ObjectId
    }]

}, { timestamps: false, versionKey: false })

GroupSchema.index({ mentees: 1, schedules: 1 })

module.exports = mongoose.model("Group", GroupSchema)