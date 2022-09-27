const express = require('express')
const router = express.Router()
const {
    verifyUserToken
} = require('../auth/jwtAuth')
const {
    initiatePayment
} = require('../controllers/paymentController')

router.post('/pay_for_order', verifyUserToken, initiatePayment)

module.exports = router