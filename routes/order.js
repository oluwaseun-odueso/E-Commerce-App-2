const express = require('express')
const router = express.Router()
const {verifyUserToken} = require('../auth/jwtAuth')
const {
    addOrder,
    getOrder
} = require('../controllers/orderControllers')

router.post('/add_order', verifyUserToken, addOrder)

module.exports = router