const express = require('express')
const router = express.Router()
const {verifySellerToken} = require('../auth/jwtAuth')
const {signupSeller, loginSeller, getSellerAccount, updateSellerAccount} = require('../controllers/sellerControllers')

router.post('/signup', signupSeller)
router.post('/login', loginSeller)
router.get('/get_account', verifySellerToken, getSellerAccount)
router.put('/update_account', verifySellerToken, updateSellerAccount)

module.exports = router