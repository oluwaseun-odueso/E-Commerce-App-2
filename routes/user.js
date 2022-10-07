const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const router = express.Router()

const {
    getImage,
} = require('../images/imageController')

const {verifyUserToken} = require('../auth/jwtAuth')

const {
    signUpUser, 
    loginUser, 
    updateUserAccount, 
    deleteAccount, 
    getUserAccount,
    uploadUserImage,
    deleteUserImage,
    getUserImage
} = require('../controllers/userController')

router.post('/signup', signUpUser)
router.post('/login', loginUser)
router.put('/update_account', verifyUserToken, updateUserAccount)
router.delete('/delete_account', verifyUserToken, deleteAccount)
router.get('/get_account', verifyUserToken, getUserAccount)
router.get('/get_image/:key', verifyUserToken, getImage)
router.post('/upload_image', verifyUserToken, upload.single('image'), uploadUserImage)
router.delete('/delete_image', verifyUserToken, deleteUserImage)

module.exports = router