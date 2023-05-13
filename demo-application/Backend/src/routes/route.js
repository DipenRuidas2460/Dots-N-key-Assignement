const express = require('express')

const {createCustomer, getCustomer, updateCustomer, deleteCustomer} = require('../controllers/customerController')
const {createCountry, getCountryDetails} = require('../controllers/countryController')
const {createState, getStateDetails} = require('../controllers/stateController')
const {createCity, getCityDetails}  = require('../controllers/cityController')
const {createLanguage, getLanguageDetails} = require('../controllers/languageController')

const router = express.Router()

// --------------------------- Customer Routes -----------------------------

router.post('/createCustomer', createCustomer)
router.get('/getCustomer/:customerId', getCustomer)
router.put('/updateCustomer/:customerId', updateCustomer)
router.delete('/deleteCustomer/:customerId', deleteCustomer)

// --------------------------- Country Route --------------------------------

router.post('/createContry', createCountry)
router.get('/getContry/:countryId', getCountryDetails)

// --------------------------- State Route --------------------------------

router.post('/createState/:countryId', createState)
router.get('/getState', getStateDetails)


// --------------------------- City Route --------------------------------

router.post('/createCity/:stateId', createCity)
router.get('/getCity', getCityDetails)


// --------------------------- Language Route --------------------------------

router.post('/createLanguage', createLanguage)
router.get('/getLanguage', getLanguageDetails)

module.exports = router
