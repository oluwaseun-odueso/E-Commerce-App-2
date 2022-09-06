const {DataTypes} = require('sequelize')
const productModel = require('../models/product')
const sequelize = require('../config/database')
const Product = productModel(sequelize, DataTypes)

async function createProduct(store_id, seller_id, product_description, price, quantity_in_stock) {
    try {
        const productDetails = {store_id, seller_id, product_description, price, quantity_in_stock}
        const product = await Product.create( productDetails )
        return product
    } catch (error) {
        return error   
    }
}

async function checkProductDescription(product_description) {
    try {
        const checkDescription = await Product.findOne({
            where: { product_description }
        })
        return checkDescription
    } catch (error) {
        return error
    }
}

async function getProductById(id) {
    try {
        const product = await Product.findOne({
            where: { id }
        })
        return product
    } catch (error) {
        return error
    }
}

const productRoutesFunctions = {   
    createProduct,
    checkProductDescription,
    getProductById
}

module.exports = productRoutesFunctions
