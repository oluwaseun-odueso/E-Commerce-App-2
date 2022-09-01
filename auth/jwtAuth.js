const jwt = require('jsonwebtoken')
require('dotenv').config()

const secret = process.env.PAYLOAD_SECRET

function generateToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, {expiresIn: '3m'}, function(error, token) {
            if (error) reject(error)
            resolve(token)
        })
    })
}

function verifyUserToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, secret, function(err, user) {
        if (err) return res.status(403).send({
            errno : 100,
            message: "Token expired! please login again."
        })
        req.user = user
        next()
    })
}

const tokenFunctions = {
    generateToken,
    verifyUserToken,
}

module.exports = tokenFunctions