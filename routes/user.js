const express = require('express')
const router = express.Router()
const {verifyToken} = require('../auth/jwtAuth')
const {signUpUser, loginUser, updateUserAccount} = require('../controllers/userControllers')

router.post('/signup', signUpUser)
router.post('/login', loginUser)

module.exports = router