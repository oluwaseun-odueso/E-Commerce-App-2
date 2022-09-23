const express = require('express')
const router = express.Router()
const {verifyUserToken} = require('../auth/jwtAuth')
const {
    addUserOrder,
    getUserOrder,
    deleteUserOrder,
    updateOrderProduct
} = require('../controllers/orderController')

router.post('/add_order', verifyUserToken, addUserOrder)
router.get('/get_order', verifyUserToken, getUserOrder)
router.delete('/delete_order', verifyUserToken, deleteUserOrder)
router.put('/update_order_product', verifyUserToken, updateOrderProduct)

module.exports = router
