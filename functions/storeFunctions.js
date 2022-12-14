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

async function checkStoreName(name) {
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

async function getStoreIdByStoreName(name) {
    try {
        const storeId = await Store.findOne({
            where: { name }
        })
        return storeId.dataValues.id
    } catch (error) {
        return error
    }
}

async function getStoreIdBySellerId(seller_id) {
    try {
        const storeId = await Store.findOne({
            where: { seller_id }
        })
        return storeId.dataValues.id
    } catch (error) {
        return error
    }
}

async function updateStoreDetails(id, seller_id, name, address) {
    try {
        const updatedStore = await Store.update({name, address}, {
            where: { id, seller_id }
        })
        return updatedStore
    } catch (error) {
        return error
    }
}

function checkIfEntriesMatch (initialValue, newValue) {
    return initialValue === newValue
}

async function deleteAStore(id, seller_id) {
    try {
        const removeStore = await Store.destroy({
            where: {id, seller_id}
        })
        return removeStore
    } catch (error) {
        return error
    }
}

async function checkIfSellerHasStore(seller_id) {
    try {
        const store = await Store.findOne({
            where: {seller_id}
        })
        return store
    } catch (error) {
        return error
    }
}

async function saveStoreImageKey(id, image_key) {
    try {
        const updated = await Store.update({image_key}, {
            where: { id }
        })
        return updated
    } catch (error) {
        return error
    }
}

async function getStoreImageKey (id) {
    try {
        const key = await Store.findOne({
            attributes: ['image_key'],
            where: { id }
        })
        return key.dataValues.image_key
    } catch (error) {
        return error
    }
}

const storeRoutesFunctions = {
    createAStore,
    checkStoreName,
    getStoreById,
    getStoreIdByStoreName,
    getStoreIdBySellerId,
    updateStoreDetails,
    checkIfEntriesMatch,
    deleteAStore,
    checkIfSellerHasStore,
    saveStoreImageKey,
    getStoreImageKey
}

module.exports = storeRoutesFunctions