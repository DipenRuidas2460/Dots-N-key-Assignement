const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const stateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    countryId: {
        type: ObjectId,
        ref: "country",
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model('state', stateSchema)