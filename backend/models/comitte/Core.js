const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CoreSchema = new Schema({
    personId: {
        type: Schema.ObjectId,
        required: true
    },
    occupation: {
        type: String,
        required: true
    }
}, { timestamps: false, versionKey: false })

module.exports = mongoose.model("Core", CoreSchema)