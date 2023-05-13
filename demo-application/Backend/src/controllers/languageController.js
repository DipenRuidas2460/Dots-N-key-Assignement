const languageModel = require('../models/languageModel')
const { isValid, isValidBody, isValidStr } = require('../validators/validator')


const createLanguage = async (req, res) => {
    try {
        let data = req.body
        if (!isValidBody(data)) { return res.status(400).send({ status: false, message: "Data can't be empty!" }) }

        let { name } = data
        if (!name) { return res.status(400).send({ status: false, message: "Language name is required!" }) }

        if (!isValid(name)) { return res.status(400).send({ status: false, message: "Please enter valid language name!" }) }
        if (!isValidStr(name)) { return res.status(400).send({ status: false, message: "Use Alphabet only in language name!" }) }
        if ((name).includes(" ")) { return res.status(400).send({ status: false, message: "Please remove any empty spaces from language name!" }) }

        let languageDetails = await languageModel.create(data)
        return res.json(languageDetails)

    } catch (err) {
        return res.status(500).send({ status: false, message: "Error", error: err.message })
    }

}

const getLanguageDetails = async (req, res) => {
    try {
        let language = await languageModel.find()

        if (language.length === 0) { return res.status(404).send({ status: false, message: "Language does not exists!" }) }

        return res.json(language)

    } catch (err) {
        return res.status(500).send({ status: false, message: "Error", error: err.message })
    }

}

module.exports = { createLanguage, getLanguageDetails }