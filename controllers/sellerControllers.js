const { generateToken } = require('../auth/jwtAuth')
const {
    createSeller, 
    checkEmail, 
    checkPhoneNumber,
    getSellerByEmail, 
    hashSellerPassword,
    collectEmailHashedPassword,
    checkIfEnteredPasswordEqualsHashed
} = require('../functions/sellerFunctions')

const signupSeller = async (req, res) => {
    if (req.body.firstName && req.body.lastName && req.body.email &&req.body.password && req.body.store_id && req.body.phone_number && req.body.address) {
        const {firstName, lastName, email, password, store_id, phone_number, address} = req.body
        try {
            if (await checkEmail(email)) { res.status(400).send({message: "Email already exists"})
            return
            }
            if (await checkPhoneNumber(phone_number)) { res.status(400).send({message: "Phone number already exists"})
                return
            }
            const hashedPassword = await hashSellerPassword(password)
            await createSeller(firstName, lastName, email, hashedPassword, store_id, phone_number, address)
            const seller = await getSellerByEmail(email)
            res.status(201).send({message: "Seller account created", seller})
        } catch (error) { res.status(400).send({message: error.message}) }
    } else res.status(400).send({message: "Please enter all necessary fields"})
}

const loginSeller = async(req, res) => {
    if (req.body.email && req.body.password) {
        const {email, password} = req.body
        try {
            if ( ! await checkEmail(email)) { res.status(400).send({message: "Email does not exist"})
                return
            }
            const hashedPassword = await collectEmailHashedPassword(email)
            console.log(hashedPassword)
            if (await checkIfEnteredPasswordEqualsHashed(password, hashedPassword.password) !== true) {res.status(400).send({message: "You have entered an incorrect password"})
                return
            }
            const sellerDetails = await getSellerByEmail(email)
            const seller = JSON.parse(JSON.stringify(sellerDetails))

            const token = await generateToken(seller)
            res.status(200).send({
                message : "You have successfully logged in", 
                seller, 
                token
            })
        } catch (error) { res.status(400).send({message: error.message}) }
    } else res.status(400).send({message: "Please enter all necessary fields"})
}

const controllers = {signupSeller, loginSeller}

module.exports = controllers