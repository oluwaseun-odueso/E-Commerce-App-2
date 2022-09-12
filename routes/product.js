const express = require('express')
const router = express.Router()
const {verifySellerToken} = require('../auth/jwtAuth')
const {
    addProduct,
    getProduct,
    getAllProducts, 
    updateProduct,
    deleteProduct
} = require('../controllers/productControllers')

router.post('/add_product', verifySellerToken, addProduct)
router.get('/get_product/:id', getProduct)
router.get('/get_all_products', getAllProducts)
router.put('/update_product/:id', verifySellerToken, updateProduct)
router.delete('/delete_product/:id', verifySellerToken, deleteProduct)

module.exports = router