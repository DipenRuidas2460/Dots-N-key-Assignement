const customerModel = require('../models/customerModel')
const cityModel = require('../models/cityModel')
const stateModel = require('../models/stateModel')
const countryModel = require('../models/countryModel')
const languageModel = require('../models/languageModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isValid, isValidBody, isValidStr, isValidEmail, isValidPassword } = require('../validators/validator')


const createCustomer = async (req, res) => {
    try {

        let data = req.body
        if (!isValidBody(data)) { return res.status(400).send({ status: false, message: "Data can't be empty!" }) }

        let { fullName, email, password, countryId, stateId, cityId, languageId } = data

        let createdData = {}

        // ----------------------------------------- Full Name Validation ---------------------------------------

        if (!fullName) { return res.status(400).send({ status: false, message: "fullName is required!" }) }
        if (!isValid(fullName)) { return res.status(400).send({ status: false, message: "Please enter valid fullName!" }) }
        if (!isValidStr(fullName)) { return res.status(400).send({ status: false, message: "Use Alphabet only in fullName!" }) }
        if ((fullName).includes(" ")) { return res.status(400).send({ status: false, message: "Please remove any empty spaces from fullName!" }) }

        // ------------------------------------------ Email Validation---------------------------------------

        if (!email) { return res.status(400).send({ status: false, message: "Email is required!" }) }
        if (!isValid(email)) { return res.status(400).send({ status: false, message: "Please enter valid EmailId!" }) }
        if (!isValidEmail(email)) { return res.status(400).send({ status: false, message: "Email is Invalid!" }) }
        const oldEmail = await customerModel.findOne({ email })
        if (oldEmail) { return res.status(409).send({ status: false, message: "Email is already exists!" }) }

        // ------------------------------------------- Password Validation ---------------------------------------

        if (!password) { return res.status(400).send({ status: false, message: "Password is required!" }) }
        if (!isValid(password)) { return res.status(400).send({ status: false, message: "Please enter valid Password!" }) }
        if (!isValidPassword(password)) { return res.status(400).send({ status: false, message: "Enter a Strong Passwlord and It should be 8-15 characters!" }) }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        // ------------------------------------------- CountryId Validation ---------------------------------------

        if (!countryId) { return res.status(400).send({ status: false, message: "CountryId not present in body!" }) }
        if (!mongoose.isValidObjectId(countryId)) { return res.status(400).send({ status: false, message: "Invalid countryId in body!" }) }
        let searchCountry = await countryModel.findById({ _id: countryId })
        if (!searchCountry) { return res.status(404).send({ status: false, message: "Country does not exists!" }) }


        // ------------------------------------------- StateId Validation ---------------------------------------

        if (!stateId) { return res.status(400).send({ status: false, message: "StateId not present in body!" }) }
        if (!mongoose.isValidObjectId(stateId)) { return res.status(400).send({ status: false, message: "Invalid stateId in body!" }) }
        let searchState = await stateModel.findById({ _id: stateId })
        if (!searchState) { return res.status(404).send({ status: false, message: "State does not exists!" }) }


        // ------------------------------------------- CityId Validation ---------------------------------------

        if (!cityId) { return res.status(400).send({ status: false, message: "CityId not present in body!" }) }
        if (!mongoose.isValidObjectId(cityId)) { return res.status(400).send({ status: false, message: "Invalid cityId in body!" }) }
        let searchCity = await cityModel.findById({ _id: cityId })
        if (!searchCity) { return res.status(404).send({ status: false, message: "City does not exists!" }) }

        // ------------------------------------------- LanguageId Validation ---------------------------------------

        if (!languageId) { return res.status(400).send({ status: false, message: "LanguageId not present in body!" }) }
        if (!mongoose.isValidObjectId(languageId)) { return res.status(400).send({ status: false, message: "Invalid languageId in body!" }) }
        let searchLanguage = await languageModel.findById({ _id: languageId })
        if (!searchLanguage) { return res.status(404).send({ status: false, message: "Language does not exists!" }) }


        createdData = {
            fullName: fullName,
            email: email,
            password: secPass,
            countryId: countryId,
            stateId: stateId,
            cityId: cityId,
            languageId: languageId
        }

        let customerData = await customerModel.create(createdData)
        return res.json(customerData)

    } catch (err) {
        return res.status(500).send({ status: false, message: "Error", error: err.message })
    }

}


const getCustomer = async (req, res) => {

    try {
        let customerId = req.params.customerId
        if (!customerId) { return res.status(400).send({ status: false, message: "CustomerId not present in params!" }) }
        if (!mongoose.isValidObjectId(customerId)) { return res.status(400).send({ status: false, message: "Invalid customerId in params!" }) }
        const customers = await customerModel.find({ _id: customerId, isDeleted: false })
        return res.json(customers)

    } catch (err) {
        return res.status(500).send({ status: false, message: "Error", error: err.message })
    }

}


const updateCustomer = async (req, res) => {
    try {

        let data = req.body
        let customerId = req.params.customerId

        if (!isValidBody(data)) { return res.status(400).send({ status: false, message: "Data can't be empty!" }) }

        let { fullName, email, password, countryId, stateId, cityId, languageId } = data

        let createdData = {}

        // ----------------------------------------- Full Name Validation ---------------------------------------

        if (fullName) {
            if (!isValid(fullName)) { return res.status(400).send({ status: false, message: "Please enter valid fullName!" }) }
            if (!isValidStr(fullName)) { return res.status(400).send({ status: false, message: "Use Alphabet only in fullName!" }) }
            createdData.fullName = fullName
        }

        // ------------------------------------------ Email Validation---------------------------------------

        if (email) {
            if (!isValid(email)) { return res.status(400).send({ status: false, message: "Please enter valid EmailId!" }) }
            if (!isValidEmail(email)) { return res.status(400).send({ status: false, message: "Email is Invalid!" }) }
            const oldEmail = await customerModel.findOne({ email })
            if (oldEmail) { return res.status(409).send({ status: false, message: "Email is already exists!" }) }
            createdData.email = email
        }

        // ------------------------------------------- Password Validation ---------------------------------------

        if (password) {
            if (!isValid(password)) { return res.status(400).send({ status: false, message: "Please enter valid Password!" }) }
            if (!isValidPassword(password)) { return res.status(400).send({ status: false, message: "Enter a Strong Passwlord and It should be 8-15 characters!" }) }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(password, salt);
            createdData.password = secPass
        }

        // ------------------------------------------- CountryId Validation ---------------------------------------

        if (countryId) {
            if (!mongoose.isValidObjectId(countryId)) { return res.status(400).send({ status: false, message: "Invalid countryId in body!" }) }
            let searchCountry = await countryModel.findById({ _id: countryId })
            if (!searchCountry) { return res.status(404).send({ status: false, message: "Country does not exists!" }) }
            createdData.countryId = countryId
        }

        // ------------------------------------------- StateId Validation ---------------------------------------

        if (stateId) {
            if (!mongoose.isValidObjectId(stateId)) { return res.status(400).send({ status: false, message: "Invalid stateId in body!" }) }
            let searchState = await stateModel.findById({ _id: stateId })
            if (!searchState) { return res.status(404).send({ status: false, message: "State does not exists!" }) }
            createdData.stateId = stateId
        }

        // ------------------------------------------- CityId Validation ---------------------------------------

        if (cityId) {
            if (!mongoose.isValidObjectId(cityId)) { return res.status(400).send({ status: false, message: "Invalid cityId in body!" }) }
            let searchCity = await cityModel.findById({ _id: cityId })
            if (!searchCity) { return res.status(404).send({ status: false, message: "City does not exists!" }) }
            createdData.cityId = cityId
        }
        // ------------------------------------------- LanguageId Validation ---------------------------------------

        if (languageId) {
            if (!mongoose.isValidObjectId(languageId)) { return res.status(400).send({ status: false, message: "Invalid languageId in body!" }) }
            let searchLanguage = await languageModel.findById({ _id: languageId })
            if (!searchLanguage) { return res.status(404).send({ status: false, message: "Language does not exists!" }) }
            createdData.languageId = languageId
        }


        // ------------------------------------------- CustomerId Validation ------------------------------------

        if (!customerId) { return res.status(400).send({ status: false, message: "CustomerId not present in params!" }) }
        if (!mongoose.isValidObjectId(customerId)) { return res.status(400).send({ status: false, message: "Invalid customerId in params!" }) }
        let searchCustomer = await customerModel.findById({ _id: customerId })
        if (!searchCustomer) return res.status(404).send({ status: false, message: "Customer does not exists!" })

        let customerData = await customerModel.findOneAndUpdate({ _id: customerId }, createdData, { new: true })
        return res.json(customerData)

    } catch (err) {
        return res.status(500).send({ status: false, message: "Error", error: err.message })
    }

}


const deleteCustomer = async (req, res) => {
    try {
        let customerId = req.params.customerId
        if (!customerId) { return res.status(400).send({ status: false, message: "CustomerId not present in params!" }) }
        if (!mongoose.isValidObjectId(customerId)) { return res.status(400).send({ status: false, message: "Invalid customerId in params!" }) }
        const customers = await customerModel.findbyId({ _id: customerId})
        if(!customers) return res.status(404).send({ status: false, message: "Customer does not exists!" })
        if(customers.isDeleted === true) return res.status(404).send({ status: false, message: "Customer details already deleted!" })
        const custo = await customerModel.findOneAndUpdate({_id:customerId}, {$set:{isDeleted:true, deletedAt:Date.now()}}, {new:true})
        return res.json({"Success":"Customer Deleted Successfully", data:custo})

    } catch (err) {
        return res.status(500).send({ status: false, message: "Error", error: err.message })
    }
}


module.exports = { createCustomer, getCustomer, updateCustomer, deleteCustomer }

