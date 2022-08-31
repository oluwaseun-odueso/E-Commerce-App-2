const express = require('express')
const router = express.Router()
const {verifyToken} = require('../auth/jwtAuth')
const verifyAdmin = require('../auth/adminAuth')
const {signUpUser, loginUser, updateUserAccount, deleteAccount, getAccount, getAllAccounts} = require('../controllers/userControllers')

router.post('/signup', signUpUser)
router.post('/login', loginUser)
router.put('/update_account', verifyToken, updateUserAccount)
router.delete('/delete_account', verifyToken, deleteAccount)
router.get('/get_account', verifyToken, getAccount)
router.get('/get_all_accounts', verifyAdmin, getAllAccounts)

module.exports = router