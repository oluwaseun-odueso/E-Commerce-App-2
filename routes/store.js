const express = require('express')
const router = express.Router()
const {verifySellerToken} = require('../auth/jwtAuth')
const {
    createStore, 
    getStore, 
    updateStore,
    deleteStore, 
    // getAllStores
} = require('../controllers/storeController')

router.post('/create_store', verifySellerToken, createStore)
router.get('/get_store/:id', verifySellerToken, getStore)
router.put('/update_store_details/:id', verifySellerToken, updateStore)
router.delete('/close_store/:id', verifySellerToken, deleteStore)
// router.get('/get_all_stores', verifySellerToken, getAllStores)

module.exports = router