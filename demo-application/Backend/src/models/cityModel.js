const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    stateId: {
        type: ObjectId,
        ref: "state",
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model('city', citySchema)