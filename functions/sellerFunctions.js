const {DataTypes} = require('sequelize')
const sellerModel = require('../models/seller')
const bcrypt = require('bcrypt')
const sequelize = require('../config/database')
const Seller = sellerModel(sequelize, DataTypes)

async function createSeller(first_name, last_name, email, password, store_id, phone_number, address) {
    try {
        const sellerDetails = {first_name, last_name, email, password, store_id, phone_number, address}
        const seller = await Seller.create(sellerDetails)
        return seller
    } catch (error) {
        return error
    }
}

async function checkEmail (email) {
    try {
        const emailCheck = await Seller.findOne({
            where: { email }
        })
        return emailCheck ? true : false
    } catch (error) {
        return error
    }
}

async function checkPhoneNumber(phone_number) {
    try{
        const phoneNumberCheck = await Seller.findOne({
            where: { phone_number }
        })
        return phoneNumberCheck ? true : false
    }
    catch (error) {
        return error
    }
}

async function getSellerById(id) {
    try {
        const details = await Seller.findOne({
            attributes: {exclude: ['password']},
            where: {id}
        });
        return details
    } catch (error) {
        return error   
    }
}

async function getSellerByEmail(email) {
    try {
        const result = await Seller.findOne({
            attributes: { exclude: ['password']},
            where: { email }
          });

        return result
    } catch (error) {
        return error
    }
}

async function hashSellerPassword(password) {
    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);   
        return hash 
    } catch (error) {
        return error
    }
}

async function collectEmailHashedPassword(email) {
    try {
        const password = await Seller.findOne({
            attributes: ['password'],
            where: {email}
        })
        return password
    } catch (error) {
        return error
    }
}

async function checkIfEnteredPasswordEqualsHashed(password, hashedPW) {
    try {
        const result = await bcrypt.compare(password, hashedPW)
        return (result)
    } catch (error) {
        return error
    }
}

async function updateSellerAccountDetails(id, first_name, last_name, email, store_id, phone_number, address) {
    try {
        const updated = await Seller.update({first_name, last_name, email, store_id, phone_number, address}, {
            where: { id }
        })
        return updated
    } catch (error) {
        return error
    }
}

async function updateSellerStoreId(id, store_id) {
    try {
        const updatedStoreId = await Seller.update({store_id}, {
            where: { id }
        })
        return updatedStoreId
    } catch (error) {
        return error
    }
}

function checkIfEntriesMatch(a, b) {
    return a === b
}

async function deleteSeller(id) {
    try {
        const deleted = await Seller.destroy({
            where: { id }
        })
        return deleted
    } catch (error) {
        return error
    }
}

async function getAllSellers() {
    try {
        const allSellers = Seller.findAll({
            attributes: { exclude: ['password'] }
        });
        return allSellers
    } catch (error) {
        return error
    }
}

async function getSellerStoreId(id) {
    try {
        const storeId = Seller.findOne({
            attributes: ['store_id'],
            where: { id }
        })
        return storeId
    } catch (error) {
        return error
    }
}

async function saveSellerImageKey(id, image_key) {
    try {
        const updated = await Seller.update({image_key}, {
            where: { id }
        })
        return updated
    } catch (error) {
        return error
    }
}


async function getSellerImageKey (id) {
    try {
        const key = await Seller.findOne({
            attributes: ['image_key'],
            where: { id }
        })
        return key.dataValues.image_key
    } catch (error) {
        return error
    }
}

const sellerRoutesFunctions = {
    createSeller, 
    checkEmail, 
    checkPhoneNumber, 
    getSellerById,
    getSellerByEmail,
    getAllSellers,
    hashSellerPassword,
    deleteSeller,
    checkIfEntriesMatch, 
    saveSellerImageKey,
    getSellerImageKey,
    collectEmailHashedPassword, 
    updateSellerAccountDetails,
    updateSellerStoreId,
    checkIfEnteredPasswordEqualsHashed,
    getSellerStoreId
}

module.exports = sellerRoutesFunctions