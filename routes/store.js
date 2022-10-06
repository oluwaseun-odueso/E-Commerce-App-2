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
    createStore, 
    getStore, 
    updateStore,
    deleteStore, 
    uploadStoreImage
} = require('../controllers/storeController')

router.post('/create_store', verifySellerToken, createStore)
router.get('/get_store/:id', verifySellerToken, getStore)
router.put('/update_store_details/:id', verifySellerToken, updateStore)
router.delete('/close_store/:id', verifySellerToken, deleteStore)
router.get('/get_image/:key', getImage)
router.post('/upload_image/:id', verifySellerToken, upload.single('image'), uploadStoreImage)
router.delete('/delete_image/:key', verifySellerToken, deleteImage)

module.exports = router