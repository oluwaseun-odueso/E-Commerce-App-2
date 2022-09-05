const express = require('express')
const router = express.Router()
const {verifySellerToken} = require('../auth/jwtAuth')
const {
    createStore, 
    getStore, 
    updateStore
} = require('../controllers/storeControllers.js')

router.post('/create_store', verifySellerToken, createStore)
router.get('/get_store/:id', verifySellerToken, getStore)
router.put('/update_store_details/:id', verifySellerToken, updateStore)

module.exports = router