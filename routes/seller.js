const express = require('express')
const router = express.Router()
const {signupSeller} = require('../controllers/sellerControllers')

router.post('/signup', signupSeller)

module.exports = router