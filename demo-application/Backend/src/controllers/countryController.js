const countryModel = require('../models/countryModel')
const { isValid, isValidBody, isValidStr } = require('../validators/validator')


const createCountry = async (req, res) => {
    try {
        let data = req.body
        if (!isValidBody(data)) { return res.status(400).send({ status: false, message: "Data can't be empty!" }) }

        let { name } = data

        // ----------------------------------------- Country Name Validation ----------------------------------
        
        if (!name) { return res.status(400).send({ status: false, message: "Country name is required!" }) }
        if (!isValid(name)) { return res.status(400).send({ status: false, message: "Please enter valid country name!" }) }
        if (!isValidStr(name)) { return res.status(400).send({ status: false, message: "Use Alphabet only in country name!" }) }
        if ((name).includes(" ")) { return res.status(400).send({ status: false, message: "Please remove any empty spaces from country name!" }) }

        let countryDetails = await countryModel.create(data)
        return res.json(countryDetails)

    } catch (err) {
        return res.status(500).send({ status: false, message: "Error", error: err.message })
    }

}

const getCountryDetails = async (req, res) => {
    try {
        let country = await countryModel.find()

        if (country.length === 0) { return res.status(404).send({ status: false, message: "Country does not exists!" }) }

        return res.json(country)

    } catch (err) {
        return res.status(500).send({ status: false, message: "Error", error: err.message })
    }

}

module.exports = { createCountry, getCountryDetails }