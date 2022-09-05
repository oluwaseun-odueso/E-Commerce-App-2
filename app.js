const express = require('express')
const userRoutes = require('./routes/user')
const sellerRoutes = require('./routes/seller')
const storeRoutes = require('./routes/store')
require('dotenv').config()

const port = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use('/user', userRoutes)
app.use('/seller', sellerRoutes)
app.use('/store', storeRoutes)

app.get('/', (req, res) => {
    res.status(200).send('Official E-commerce page')
})

app.listen(port)

module.exports = app