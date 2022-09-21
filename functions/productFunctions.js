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

async function checkIfProductsExist(productIdsArray) {
    try {
        for (let i = 0; i < productIdsArray.length; i++) {
            const product = await getProductById(productIdsArray[i])
            if (! product) {
                return productIdsArray[i]
            }
        }    
    } catch (error) {
        return error
    }
}

async function checkProductOrderQuantity(productIdsArray, productQuantityArray) {
    try {
        for (let i = 0; i < productIdsArray.length; i++) {
            const product = await getProductById(productIdsArray[i])
            console.log(product.quantity_in_stock)
            if (product.quantity_in_stock < productQuantityArray[i]) {
                return product.product_description
            }
            // else return false
        }
    } catch (error) {
        return error
    }
}

async function getProducts() {
    try {
        const allProducts = await Product.findAll()
        return allProducts
    } catch (error) {
        return error
    }
}

async function updateProductDetails(id, seller_id, product_description, price, quantity_in_stock) {
    try {
        const updateProduct = await Product.update({product_description, price, quantity_in_stock}, {
            where: {id, seller_id}
        })
        return updateProduct
    } catch (error) {
        return error
    }
}

async function deleteAProduct(id, seller_id) {
    try {
        const deleted = await Product.destroy({
            where: { id, seller_id }
        })
        return deleted
    } catch (error) {
        return error   
    }
}

const productRoutesFunctions = {   
    createProduct,
    checkProductDescription,
    getProductById,
    getProducts,
    updateProductDetails,
    deleteAProduct,
    checkIfProductsExist,
    checkProductOrderQuantity
}

module.exports = productRoutesFunctions
