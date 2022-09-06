const express = require('express')
const router = express.Router()
const {verifySellerToken} = require('../auth/jwtAuth')
const {addProduct} = require('../controllers/productControllers')

router.post('/add_product', verifySellerToken, addProduct)

module.exports = router