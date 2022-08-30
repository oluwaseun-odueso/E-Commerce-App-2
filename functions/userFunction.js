const {DataTypes} = require('sequelize')
const userModel = require('../models/user')
const bcrypt = require('bcrypt');
const sequelize = require('../config/database')
const User = userModel(sequelize, DataTypes)

async function createUser(first_name, last_name, email, phone_number, password, address, state, postal_code) {
    try {
        const details = {first_name, last_name, email, phone_number, password, address, state, postal_code}
        const user = await User.create(details)
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

async function getAUser (id) {
    try {
        const user = await User.findOne({
            attributes: { exclude: ['password'] },
            where: { id }
        })
        return user
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

async function getDetailsByEmail(email) {
    try {
        const result = await User.findOne({
            attributes: { exclude: ['password']},
            where: { email }
          });

        return result
    } catch (error) {
        return error
    }
}

// getDetailsByEmail('tobi@gmail.com')
//     .then(i => console.log(i))
//     .catch(error => console.log(error))

const exportFunctions = {
    createUser,
    getAUser, 
    checkEmail, 
    checkPhoneNumber,
    hashUserPassword,
    getDetailsByEmail
}

module.exports = exportFunctions