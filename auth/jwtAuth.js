const jwt = require('jsonwebtoken')
require('dotenv').config()

const key = process.env.PAYLOAD_SECRET

function generateToken(user) {
    return new Promise((resolve, reject) => {
        jwt.sign(user, key, function(error, token) {
            if (error) reject(error)
            resolve(token)
        }, {expiresIn: '3m'})
    })
}

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, key, function(err, user) {
        if (err) return res.status(403).send({
            errno : 106,
            message: "Token expired, please login again"
            // message : "Invalid token, please login again."
        })
        req.user = user
        next()
    })
}

const tokenFunctions = {
    generateToken,
    verifyToken
}

module.exports = tokenFunctions