const {
    createUser, 
    checkEmail, 
    checkPhoneNumber, 
    hashUserPassword, 
    getDetailsByEmail
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
            const user = await getDetailsByEmail(email)
            res.status(201).send({ message : "New user added", user})
        } catch (error) {res.status(400).send({message: error.message})}
    }
    else res.status(400).json({ errno: "101", message: "Please enter all fields" })
}


const controllers = {signUpUser, loginUser}

module.exports = controllers
