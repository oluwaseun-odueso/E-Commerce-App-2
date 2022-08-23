const express = require('express')
const router = express.Router()

router.post('/sign_up', async(req, res) => {
    try {
        
    } catch (error) { res.status(500).send({message: error.message})}
})

module.exports = router