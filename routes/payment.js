const express = require('express')
const router = express.Router()
const {
    verifyUserToken
} = require('../auth/jwtAuth')
const {
    initiatePayment,
    getPaymentTransaction
} = require('../controllers/paymentController')

router.post('/pay_for_order', verifyUserToken, initiatePayment)
router.get('/view_payment/:id', verifyUserToken, getPaymentTransaction)

module.exports = router