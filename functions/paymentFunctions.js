const {DataTypes} = require('sequelize')
const paymentModel = require('../models/payment')
const sequelize = require('../config/database')
const { getUserById } = require('./userFunctions')
const Payment = paymentModel(sequelize, DataTypes)

async function createData(order) {
    try {
        const userEmail = await getUserById(order.dataValues.user_id)
        const data = JSON.stringify({
            "email": userEmail.dataValues.email,
            "order_id": order.dataValues.id,
            "user_id": order.dataValues.user_id,
            "amount": order.dataValues.total * 100,
            "payment_status": order.dataValues.payment_status
        })
        return data
    } catch (error) {
        return error
    }
}

async function savePayment(user_id, order_id, amount, payment_status) {
    try {
        const newPaymentRecord = await Payment.create({user_id, order_id, amount, payment_status}) 
        return newPaymentRecord
    } catch (error) {
        return error
    }
}

const  paymentRoutesFunctions = {
    createData,
    savePayment
}

module.exports = paymentRoutesFunctions