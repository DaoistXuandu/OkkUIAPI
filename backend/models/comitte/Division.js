const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DivisionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    member: {
        pic: {
            type: Schema.ObjectId,
            required: true
        },
        vpic: {
            first: {
                type: Schema.ObjectId,
                required: true
            },
            second: {
                type: Schema.ObjectId,
                required: true
            },
        },
        staff: [{
            type: Schema.ObjectId,
            required: true
        }]
    },
    meet: [{
        type: Schema.ObjectId,
    }]
}, { timestamps: false, versionKey: false })

DivisionSchema.index({ staff: 1 })
module.exports = mongoose.model("Division", DivisionSchema)