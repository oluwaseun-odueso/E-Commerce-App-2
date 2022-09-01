const express = require('express')
const router = express.Router()
const {signupSeller, loginSeller} = require('../controllers/sellerControllers')

router.post('/signup', signupSeller)
router.post('/login', loginSeller)

module.exports = router