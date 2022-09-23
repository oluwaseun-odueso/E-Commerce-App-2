const express = require('express')
const router = express.Router()
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

module.exports = router