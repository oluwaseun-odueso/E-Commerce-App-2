const {generateToken} = require('../auth/jwtAuth')
const {
    createUser, 
    checkEmail, 
    checkPhoneNumber, 
    checkIfEntriesMatch,
    hashUserPassword,
    deleteUserAccount,
    getUserById, 
    getUserByEmail,
    getAllUsers,
    collectEmailHashedPassword,
    updateAccountDetails,
    checkIfEnteredPasswordEqualsHashed
} = require('../functions/userFunctions')

const signUpUser = async(req, res) => {
    if (req.body.first_name && req.body.last_name && req.body.email && req.body.phone_number && req.body.password && req.body.address && req.body.state && req.body.postal_code) {
        const {first_name, last_name, email, phone_number, password, address, state, postal_code} = req.body
        try {
            if (await checkEmail(email)){ res.status(400).send({message: "Email already exists"}) 
                return
            }
            if (await checkPhoneNumber(phone_number)){ res.status(400).send({message: "Phone number already exists"}) 
                return
            }

            const hashedPassword = await hashUserPassword(password)
            await createUser(first_name, last_name, email, phone_number, hashedPassword, address, state, postal_code)
            const user = await getUserByEmail(email)
            res.status(201).send({ message : "Your account has been created", user})
        } catch (error) {res.status(400).send({message: error.message})}
    }
    else res.status(400).json({ errno: "101", message: "Please enter all fields" })
}

const loginUser = async(req, res) => {
    if (req.body.email && req.body.password) {
        const {email, password} = req.body
        try {
            if ( ! await checkEmail (email) ) { 
                res.status(400).send({message: "Email does not exist"})
                return
            }
            const hashedPassword = await collectEmailHashedPassword(email)
            if (await checkIfEnteredPasswordEqualsHashed(password, hashedPassword.password) !== true) {
                res.status(400).send({message: "You have entered an incorrect password"})
                return
            }
            const userDetails = await getUserByEmail(email)
            const user = JSON.parse(JSON.stringify(userDetails))

            const token = await generateToken(user)
            res.status(200).send({
                message : "You have successfully logged in", 
                user, 
                token
            })
        } catch (error) { res.status(400).send({message: error.message}) }
    } else res.status(400).json({ errno: "102", message: "Please enter all fields" })
}

const updateUserAccount = async function(req, res) {
    if (req.body.first_name && req.body.last_name && req.body.email && req.body.phone_number && req.body.address && req.body.state && req.body.postal_code) {
        const {first_name, last_name, email, phone_number, address, state, postal_code} = req.body
        const user = await getUserById(req.user.id)
        try {
            if ( await checkEmail (email) && ! checkIfEntriesMatch(user.email, email)) {
                res.status(400).send({message: "Email already exists"})
                return
            }
            if ( await checkPhoneNumber (phone_number) && ! checkIfEntriesMatch(user.phone_number, phone_number)) {
                res.status(400).send({message: "Phone number already exists"})
                return
            }
            await updateAccountDetails(req.user.id, first_name, last_name, email, phone_number, address, state, postal_code)
            const updated = await getUserById(req.user.id)
            res.status(200).send({message: 'Account details updated', updated})
        } catch (error) { res.status(400).send({message: error.message}) }
    }
    else res.status(400).send({ errno: "103", message: "Please enter all fields" })
}

const deleteAccount = async function(req, res) {
    try {
        const deleteAcct = await deleteUserAccount(req.user.id)
        if (deleteAcct) { res.status(200).send({message: "Account deleted!"})
            return
        }
        res.status(400).send({message: "Account does not exist"})
    } catch (error) { res.status(400).send({message: error.message}) }
}

const getUserAccount = async function (req, res) {
    try {
        const user = await getUserById(req.user.id)
        if (! user) {         
            res.status(400).send({message: "Cannot get account"})
            return 
        }
        res.status(200).send({ user })
    } catch (error) {
        return error
    }
}

const getAllAccounts = async function (res) {
    try {
        const users = await getAllUsers()
        if (! users) {
            res.status(200).send({message: 'No user found'})
            return
        }
        res.status(400).send({users})
    } catch (error) {
        return error
    }
}

const userControllers = {signUpUser, loginUser, updateUserAccount, deleteAccount, getUserAccount}

module.exports = userControllers
