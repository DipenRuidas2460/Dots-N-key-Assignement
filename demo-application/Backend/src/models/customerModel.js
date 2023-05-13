const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const customerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    countryId: {
        type: ObjectId,
        ref: "country",
        required: true
    },

    stateId: {
        type: ObjectId,
        ref: "state",
        required: true
    },

    cityId: {
        type: ObjectId,
        ref: "city",
        required: true
    },

    languageId: {
        type: ObjectId,
        ref: "language",
        required: true
    },

    isDeleted: {
        type: Boolean,
        default: null
    },

    deletedAt: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true })

module.exports = mongoose.model("customer", customerSchema)