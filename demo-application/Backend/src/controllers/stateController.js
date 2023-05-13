const stateModel = require('../models/stateModel')
const countryModel = require('../models/countryModel')

const { isValid, isValidBody, isValidStr } = require('../validators/validator')
const mongoose = require('mongoose')


const createState = async (req, res) => {
    try {
        let data = req.body
        let countryId = req.params.countryId

        let createdData = {}

        if (!isValidBody(data)) { return res.status(400).send({ status: false, message: "Data can't be empty!" }) }

        let {name} = data

        // --------------------------------------- State Name Validation --------------------------------------------

        if (!name) { return res.status(400).send({ status: false, message: "State name is required!" }) }
        if (!isValid(name)) { return res.status(400).send({ status: false, message: "Please enter valid state name!" }) }
        if (!isValidStr(name)) { return res.status(400).send({ status: false, message: "Use Alphabet only in state name!" }) }
        if ((name).includes(" ")) { return res.status(400).send({ status: false, message: "Please remove any empty spaces from state name!" }) }
        createdData.name = data.name

        // ---------------------------------------- Country Id Validation ----------------------------------------

        if (!countryId) { return res.status(400).send({ status: false, message: "countryId must be present in params!" }) }
        if(!mongoose.isValidObjectId(countryId)) { return res.status(400).send({ status: false, message: "Invalid countryId in params!" }) }
        let searchCountry = await countryModel.findById({_id:countryId})
        if(!searchCountry) { return res.status(404).send({ status: false, message: "Country does not exists!" }) }
        createdData.countryId = countryId

        let stateDetails = await stateModel.create(createdData)
        return res.json(stateDetails)

    } catch (err) {
        return res.status(500).send({ status: false, message: "Error", error: err.message })
    }

}

const getStateDetails = async (req, res) => {
    try {
        let state = await stateModel.find()

        if (state.length === 0) { return res.status(404).send({ status: false, message: "State does not exists!" }) }

        return res.json(state)

    } catch (err) {
        return res.status(500).send({ status: false, message: "Error", error: err.message })
    }

}

module.exports = { createState, getStateDetails }