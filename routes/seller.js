const express = require('express')
const router = express.Router()
const {verifySellerToken} = require('../auth/jwtAuth')
const {signupSeller, loginSeller, getSellerAccount, updateSellerAccount, deleteSellerAccount, getAllSellersAccounts} = require('../controllers/sellerControllers')

router.post('/signup', signupSeller)
router.post('/login', loginSeller)
router.get('/get_account', verifySellerToken, getSellerAccount)
router.put('/update_account', verifySellerToken, updateSellerAccount)
router.delete('/delete_account', verifySellerToken, deleteSellerAccount)
router.get('/get_sellers', verifySellerToken, getAllSellersAccounts)

module.exports = router