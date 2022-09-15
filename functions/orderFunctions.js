const {DataTypes} = require('sequelize')
const orderModel = require('../models/order')
const sequelize = require('../config/database')
const { use } = require('../routes/order')
const Order = orderModel(sequelize, DataTypes)

async function createOrder(user_id, product_id, quantity, amount) {
    try {
        const orderDetails = {user_id, product_id, quantity, amount}
        const order = await Order.create(orderDetails)
        return order
    } catch (error) {
        return error
    }
}

async function getOrder(user_id) {
    try {
        const order = await Order.findAll({
            where: { user_id }
        })
        return order
    } catch (error) {
        return error
    }
}

async function deleteOrder(user_id) {
    try {
        const deleted = await Order.destroy({
            where: {user_id}
        })
        return deleted
    } catch (error) {
        return error
    }
}

const orderRoutesFunctions = {
    createOrder,
    getOrder, 
    deleteOrder
}

module.exports = orderRoutesFunctions