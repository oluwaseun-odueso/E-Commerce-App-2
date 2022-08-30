const {generateToken} = require('../auth/jwtAuth')
const {
    createUser, 
    checkEmail, 
    checkPhoneNumber, 
    checkIfEntriesMatch,
    hashUserPassword,
    getUserById, 
    getUserByEmail,
    collectEmailHashedPassword,
    updateAccountDetails,
    checkIfEnteredPasswordEqualsHashed
} = require('../functions/userFunction')

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
            res.status(201).send({ message : "New user added", user})
        } catch (error) {res.status(400).send({message: error.message})}
    }
    else res.status(400).json({ errno: "101", message: "Please enter all fields" })
}

const loginUser = async(req, res) => {
    if (req.body.email && req.body.password) {
        const {email, password} = req.body
        try {
            if ( ! await checkEmail (email) ) { res.status(400).send({message: "Email does not exist"})
                return
            }
            const hashedPassword = await collectEmailHashedPassword(email)
            console.log(hashedPassword)
            if (await checkIfEnteredPasswordEqualsHashed(password, hashedPassword.password) !== true) {res.status(400).send({message: "You have entered an incorrect password"})
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

const controllers = {signUpUser, loginUser}

module.exports = controllers
