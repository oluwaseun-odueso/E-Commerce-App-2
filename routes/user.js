const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const router = express.Router()

const {
    getImage,
    uploadImage,
    deleteImage
} = require('../images/imageController')

const {verifyUserToken} = require('../auth/jwtAuth')

const {
    signUpUser, 
    loginUser, 
    updateUserAccount, 
    deleteAccount, 
    getUserAccount
} = require('../controllers/userController')

router.post('/signup', signUpUser)
router.post('/login', loginUser)
router.put('/update_account', verifyUserToken, updateUserAccount)
router.delete('/delete_account', verifyUserToken, deleteAccount)
router.get('/get_account', verifyUserToken, getUserAccount)
router.get('/get_image/:key', getImage)
router.post('/upload_image', verifyUserToken, upload.single('image'), uploadImage)
router.delete('/delete_image/:key', verifyUserToken, deleteImage)

module.exports = router