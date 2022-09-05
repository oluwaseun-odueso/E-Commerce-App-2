const {DataTypes} = require('sequelize')
const storeModel = require('../models/store')
const sequelize = require('../config/database');
const Store = storeModel(sequelize, DataTypes)

async function createAStore(seller_id, name, address) {
    try {
        const storeDetails = {seller_id, name, address}
        const store = await Store.create(storeDetails)
        return store
    } catch (error) {
        return error
    }
}

async function checkName(name) {
    try {
        const storeNameCheck = await Store.findOne({
            where: { name }
        })
        return storeNameCheck ? true : false
    } catch (error) {
        return error
    }
}

async function getStoreById(id, seller_id) {
    try {
        const store = await Store.findOne({
            where: { id, seller_id }
        })
        return store
    } catch (error) {
        return error
    }
}

const exportFunctions = {
    createAStore,
    checkName,
    getStoreById
}

module.exports = exportFunctions