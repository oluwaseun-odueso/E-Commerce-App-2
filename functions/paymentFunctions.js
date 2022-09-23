const {DataTypes} = require('sequelize')
const paymentModel = require('../models/payment')
const sequelize = require('../config/database')
const Payment = paymentModel(sequelize, DataTypes)

function createData(order) {
    const data = JSON.stringify({
        "order id": order.dataValues.id,
        "user id": order.dataValues.user_id,
        "total": order.dataValues.total * 100,
        "payment_status": order.dataValues.payment_status
    })
    return data
}

const  paymentRoutesFunctions = {
    createData
}

module.exports = paymentRoutesFunctions