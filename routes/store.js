const express = require('express')
const router = express.Router()
const {verifySellerToken} = require('../auth/jwtAuth')
const {createStore} = require('../controllers/storeControllers.js')

router.post('/create_store', verifySellerToken, createStore)

module.exports = router