const exp = require('constants')
const express = require('express')
require('dotenv').config()
const port = process.env.PORT
const app = express()
app.use(express.json())


app.get('/', (req, res) => {
    res.status(200).send('Official E-commerce page')
})

app.listen(port)