const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const router = express.Router()

const {
    getImage,
    uploadImage,
    deleteImage
} = require('../images/imageController')

const {verifySellerToken} = require('../auth/jwtAuth')

const {
    signupSeller, 
    loginSeller, 
    getSellerAccount, 
    updateSellerAccount, 
    deleteSellerAccount, 
    getAllSellersAccounts
} = require('../controllers/sellerController')

router.post('/signup', signupSeller)
router.post('/login', loginSeller)
router.get('/get_account', verifySellerToken, getSellerAccount)
router.put('/update_account', verifySellerToken, updateSellerAccount)
router.delete('/delete_account', verifySellerToken, deleteSellerAccount)
router.get('/get_sellers', verifySellerToken, getAllSellersAccounts)
router.get('/get_image/:key', getImage)
router.post('/upload_image', verifySellerToken, upload.single('image'), uploadImage)
router.delete('/delete_image/:key', verifySellerToken, deleteImage)

module.exports = router