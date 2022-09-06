const express = require('express')
const router = express.Router()
const {verifySellerToken} = require('../auth/jwtAuth')
const {
    addProduct,
    getProduct,
    getAllProducts
} = require('../controllers/productControllers')

router.post('/add_product', verifySellerToken, addProduct)
router.get('/get_product/:id', getProduct)
router.get('/get_all_products', getAllProducts)

module.exports = router