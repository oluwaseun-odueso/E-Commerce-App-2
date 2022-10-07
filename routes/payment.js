const express = require('express')
const router = express.Router()
const {
    verifyUserToken
} = require('../auth/jwtAuth')
const {
    initiatePayment,
    getPaymentTransaction,
    updatePayment
} = require('../controllers/paymentController')

router.post('/pay_for_order', verifyUserToken, initiatePayment)
router.get('/view_payment/:id', verifyUserToken, getPaymentTransaction)
router.post('/webhook/update_payment_status', updatePayment)

module.exports = router