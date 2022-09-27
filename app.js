const express = require('express')
const userRoutes = require('./routes/user')
const sellerRoutes = require('./routes/seller')
const storeRoutes = require('./routes/store')
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order')
const paymentRoutes = require('./routes/payment')
require('dotenv').config()

const port = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use('/user', userRoutes)
app.use('/seller', sellerRoutes)
app.use('/store', storeRoutes)
app.use('/product', productRoutes)
app.use('/order', orderRoutes)
app.use('/payment', paymentRoutes)

app.get('/', (req, res) => {
    res.status(200).send('Official E-commerce page')
})

app.post('/initialize_transaction', async (req, res) => {
    try {
        const data = '{ "amount": "50000" , "email": "seunoduez@gmail.com"}'
        const response = await axios.post('https://api.paystack.co/transaction/initialize', data, {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": 'Bearer ' + process.env.PAYSTACK_TOKEN
            }
        }, { timeout: 2000})
        res.status(200).send(response.data)
    } catch (error) {
        if (error.message === 'getaddrinfo ENOTFOUND api.paystack.co') {
            res.status(500).send({message: "Check your network connection and try again"})
        }
    }
})

app.listen(port)

module.exports = app