const {DataTypes} = require('sequelize')
const userModel = require('../models/user')
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');
const User = userModel(sequelize, DataTypes)

async function createUser(first_name, last_name, email, phone_number, password, address, state, postal_code) {
    try {
        const userDetails = {first_name, last_name, email, phone_number, password, address, state, postal_code}
        const user = await User.create(userDetails)
        return user
    } catch (error) {
        return error
    }
}

async function checkEmail (email) {
    try {
        const emailCheck = await User.findOne({
            where: { email }
        })
        return emailCheck ? true : false
    } catch (error) {
        return error
    }
}

async function checkPhoneNumber(phone_number) {
    try{
        const phoneNumberCheck = await User.findOne({
            where: { phone_number }
        })
        return phoneNumberCheck ? true : false
    }
    catch (error) {
        return error
    }
}

async function getUserById(id) {
    try {
        const details = await User.findOne({
            attributes: {exclude: ['password', 'image_key']},
            where: {id}
        });
        return details
    } catch (error) {
        return error   
    }
}

async function hashUserPassword(password) {
    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);   
        return hash 
    } catch (error) {
        return error
    }
}

async function getUserByEmail(email) {
    try {
        const result = await User.findOne({
            attributes: { exclude: ['password' ,'image_key']},
            where: { email }
          });

        return result
    } catch (error) {
        return error
    }
}

async function collectEmailHashedPassword(email) {
    try {
        const password = await User.findOne({
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

function checkIfEntriesMatch(a, b) {
    return a === b
}

async function updateAccountDetails(id, first_name, last_name, email, phone_number, address, state, postal_code) {
    try {
        const updated = await User.update({first_name, last_name, email, phone_number, address, state, postal_code}, {
            where: { id }
        })
        return updated
    } catch (error) {
        return error
    }
}

async function saveImageKey(id, image_key) {
    try {
        const updated = await User.update({image_key}, {
            where: { id }
        })
        return updated
    } catch (error) {
        return error
    }
}

async function getUserImageKey (id) {
    try {
        const key = await User.findOne({
            attributes: ['image_key'],
            where: { id }
        })
        return key
    } catch (error) {
        return error
    }
}

async function deleteUserAccount(id) {
    try {
        const deleted = await User.destroy({
            where: { id }
        })
        return deleted
    } catch (error) {
        return error
    }
}

async function getAllUsers() {
    try {
        const allUsers = User.findAll({
            attributes: { exclude: ['password'] }
        });
        return allUsers
    } catch (error) {
        return error
    }
}

const userRoutesFunctions = {
    createUser,
    getUserById,
    getUserByEmail,
    getAllUsers,
    checkEmail, 
    checkPhoneNumber,
    checkIfEntriesMatch,
    hashUserPassword,
    saveImageKey,
    getUserImageKey,
    collectEmailHashedPassword,
    updateAccountDetails,
    deleteUserAccount,
    checkIfEnteredPasswordEqualsHashed
}

module.exports = userRoutesFunctions