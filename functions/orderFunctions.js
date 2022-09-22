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
        const order = await Order.findOne({
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
        const productPrices = []
        for (let i = 0; i < product_ids.length; i++) {
            const product = await getProductById(product_ids[i])
            productPrices.push(product.price)
        }
        return productPrices
    } catch (error) {
        return error
    }
}

function getPriceForQuantitiesOrdered(productPrices, orderQuantities) {
    const priceArray = []
    productPrices.forEach((num1, index) => {
        const num2 = orderQuantities[index];
        priceArray.push(num1 * num2)
    });
    return priceArray
}

function getTotalPrice(priceArray) {
    const total = priceArray.reduce((currentTotal, item) => item + currentTotal, 0);
    return total
}

async function getProductIdsForUserOrder(user_id) {
    try {
        const ids = await Order.findOne({
            attributes: ['product_ids'],
            where: {user_id}
        })
        return ids.product_ids
    } catch (error) {
        return error
    }
}

function convertProductIdsFromDatabaseToArray(ids) {
    const idArray = ids.split`,`.map(x=>+x)
    return idArray
}

// function checkIfIdsExistsInUserOrder(deleteProductIds, currentIds) {
//     console.log(deleteProductIds.every(item => currentIds.includes(item)))
//     return deleteProductIds.every(item => currentIds.includes(item))
// }

function checkIfIdsExistsInUserOrder(deleteProductIds, currentIds) {
    for (let i = 0; i < deleteProductIds.length; i++) {
        if (!currentIds.includes(deleteProductIds[i])) {
            return deleteProductIds[i]
        }
    }
}

async function checkIfUserHasOrder(user_id) {
    try {
        const order = await Order.findOne({
            where: {user_id}
        })
        return order
    } catch (error) {
        return error
    }
}

const orderRoutesFunctions = {
    createOrder,
    getOrder, 
    deleteOrder,
    getProductsPrices,
    getPriceForQuantitiesOrdered,
    getProductIdsForUserOrder,
    getTotalPrice,
    checkIfUserHasOrder,
    checkIfIdsExistsInUserOrder,
    convertProductIdsFromDatabaseToArray
}

module.exports = orderRoutesFunctions