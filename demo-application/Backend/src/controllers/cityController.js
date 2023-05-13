const cityModel = require('../models/cityModel')
const stateModel = require('../models/stateModel')

const { isValid, isValidBody, isValidStr } = require('../validators/validator')
const mongoose = require('mongoose')


const createCity = async (req, res) => {
    try {
        let data = req.body
        let stateId = req.params.stateId

        let createdData = {}

        if (!isValidBody(data)) { return res.status(400).send({ status: false, message: "Data can't be empty!" }) }

        let { name } = data

        // --------------------------------------- City Name Validation --------------------------------------------

        if (!name) { return res.status(400).send({ status: false, message: "City name is required!" }) }
        if (!isValid(name)) { return res.status(400).send({ status: false, message: "Please enter valid city name!" }) }
        if (!isValidStr(name)) { return res.status(400).send({ status: false, message: "Use Alphabet only in city name!" }) }
        if ((name).includes(" ")) { return res.status(400).send({ status: false, message: "Please remove any empty spaces from city name!" }) }
        createdData.name = data.name

        // ---------------------------------------- State Id Validation ----------------------------------------

        if (!stateId) { return res.status(400).send({ status: false, message: "stateId must be present in params!" }) }
        if (!mongoose.isValidObjectId(stateId)) { return res.status(400).send({ status: false, message: "Invalid stateId in params!" }) }
        let searchState = await stateModel.findById({ _id: stateId })
        if (!searchState) { return res.status(404).send({ status: false, message: "State does not exists!" }) }
        createdData.stateId = stateId

        let cityDetails = await cityModel.create(createdData)
        return res.json(cityDetails)

    } catch (err) {
        return res.status(500).send({ status: false, message: "Error", error: err.message })
    }

}

const getCityDetails = async (req, res) => {
    try {
        let city = await cityModel.find()

        if (city.length === 0) { return res.status(404).send({ status: false, message: "City does not exists!" }) }

        return res.json(city)

    } catch (err) {
        return res.status(500).send({ status: false, message: "Error", error: err.message })
    }

}

module.exports = { createCity, getCityDetails }