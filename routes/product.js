const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const router = express.Router()

const {
    getImage,
    uploadImage
} = require('../images/imageController')

const {verifySellerToken} = require('../auth/jwtAuth')

const {
    addProduct,
    getProduct,
    getAllProducts, 
    updateProduct,
    deleteProduct
} = require('../controllers/productController')

router.post('/add_product', verifySellerToken, addProduct)
router.get('/get_product/:id', getProduct)
router.get('/get_all_products', getAllProducts)
router.put('/update_product/:id', verifySellerToken, updateProduct)
router.delete('/delete_product/:id', verifySellerToken, deleteProduct)
router.get('/get_image/:key', getImage)
router.post('/upload_image', verifySellerToken, upload.single('image'), uploadImage)

module.exports = router