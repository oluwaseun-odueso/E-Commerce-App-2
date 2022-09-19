const {DataTypes} = require('sequelize')
const orderModel = require('../models/order')
const sequelize = require('../config/database')
const {getProductById} = require('../functions/productFunctions')
const Order = orderModel(sequelize, DataTypes)

async function createOrder(user_id, product_ids, product_quantities, price, total, payment_status) {
    try {
        const orderDetails = {user_id, product_ids, product_quantities, price, total, payment_status}
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

async function getProductsPrices(product_ids) {
    try {
        const prices = []
        for (let i = 0; i < product_ids.length; i++) {
            const product = await getProductById(product_ids[i])
            prices.push(product.price)
        }
        return prices
    } catch (error) {
        return error
    }
}

async function getPriceForQuantitiesOrdered(prices, quantities) {
    const priceArray = []
    prices.forEach((num1, index) => {
        const num2 = quantities[index];
        priceArray.push(num1 * num2)
    });
    return priceArray
}

function getTotalPrice(priceArray) {
    const total = priceArray.reduce((a, b) => a + b, 0);
    return total
}

const orderRoutesFunctions = {
    createOrder,
    getOrder, 
    deleteOrder,
    getProductsPrices,
    getPriceForQuantitiesOrdered,
    getTotalPrice
}

module.exports = orderRoutesFunctions