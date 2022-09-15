const express = require('express')
const router = express.Router()
const {verifyUserToken} = require('../auth/jwtAuth')
const {
    addOrder,
    getUserOrder
} = require('../controllers/orderControllers')

router.post('/add_order', verifyUserToken, addOrder)
router.get('/get_order', verifyUserToken, getUserOrder)

module.exports = router