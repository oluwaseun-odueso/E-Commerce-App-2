const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const router = express.Router()

const {
    getImage,
    deleteImage
} = require('../images/imageController')

const {verifySellerToken} = require('../auth/jwtAuth')

const {
    addProduct,
    getProduct,
    getAllProducts, 
    updateProduct,
    deleteProduct,
    uploadProductImage
} = require('../controllers/productController')

router.post('/add_product', verifySellerToken, addProduct)
router.get('/get_product/:id', getProduct)
router.get('/get_all_products', getAllProducts)
router.put('/update_product/:id', verifySellerToken, updateProduct)
router.delete('/delete_product/:id', verifySellerToken, deleteProduct)
router.get('/get_image/:key', getImage)
router.post('/upload_image/:id', verifySellerToken, upload.single('image'), uploadProductImage)
router.delete('/delete_image/:key', verifySellerToken, deleteImage)

module.exports = router