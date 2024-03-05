const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SponsorSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    benefit: [{
        type: String,
        required: true
    }]
}, { timestamps: false, versionKey: false })

SponsorSchema.index({ mentees: 1, schedules: 1 })

module.exports = mongoose.model("Sponsor", SponsorSchema)