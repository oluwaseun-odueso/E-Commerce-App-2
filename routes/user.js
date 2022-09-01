const express = require('express')
const router = express.Router()
const {verifyUserToken} = require('../auth/jwtAuth')
const verifyAdmin = require('../auth/adminAuth')
const {signUpUser, loginUser, updateUserAccount, deleteAccount, getAccount, getAllAccounts} = require('../controllers/userControllers')

router.post('/signup', signUpUser)
router.post('/login', loginUser)
router.put('/update_account', verifyUserToken, updateUserAccount)
router.delete('/delete_account', verifyUserToken, deleteAccount)
router.get('/get_account', verifyUserToken, getAccount)
router.get('/get_all_accounts', verifyAdmin, getAllAccounts)

module.exports = router