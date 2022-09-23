const express = require('express')
const router = express.Router()
const {
    verifyUserToken
} = require('../auth/jwtAuth')

router.post('/initialize_payment')

module.exports = router