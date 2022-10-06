const { generateToken } = require('../auth/jwtAuth')
const {
    createSeller, 
    checkEmail, 
    checkPhoneNumber,
    getSellerById,
    getSellerByEmail, 
    getAllSellers,
    deleteSeller,
    hashSellerPassword,
    checkIfEntriesMatch,
    collectEmailHashedPassword,
    updateSellerAccountDetails,
    checkIfEnteredPasswordEqualsHashed
} = require('../functions/sellerFunctions')

const signupSeller = async (req, res) => {
    if (req.body.first_name && req.body.last_name && req.body.email &&req.body.password && req.body.store_id && req.body.phone_number && req.body.address) {
        const {first_name, last_name, email, password, store_id, phone_number, address} = req.body
        try {
            if (await checkEmail(email)) { res.status(400).send({message: "Email already exists"})
            return
            }
            if (await checkPhoneNumber(phone_number)) { res.status(400).send({message: "Phone number already exists"})
                return
            }
            const hashedPassword = await hashSellerPassword(password)
            await createSeller(first_name, last_name, email, hashedPassword, store_id, phone_number, address)
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

const getSellerAccount = async function (req, res) {
    try {
        const seller = await getSellerById(req.seller.id)
        if (! seller) {         
            res.status(400).send({message: "Cannot get seller's account"})
            return 
        }
        res.status(200).send({ seller })
    } catch (error) {
        return error
    }
}

const getAllSellersAccounts = async function (res) {
    try {
        const sellers = await getAllSellers()
        if (! sellers) {
            res.status(200).send({message: 'No seller found'})
            return
        }
        res.status(400).send({sellers})
    } catch (error) {
        return error
    }
}

const updateSellerAccount = async (req, res) => {
    if (req.body.first_name && req.body.last_name && req.body.email && req.body.store_id && req.body.address && req.body.phone_number) {
        const {first_name, last_name, email, phone_number, address, store_id} = req.body
        const seller = await getSellerById(req.seller.id)
        try {
            if ( await checkEmail (email) && ! checkIfEntriesMatch(seller.email, email)) {
                res.status(400).send({message: "Email already exists"})
                return
            }
            if ( await checkPhoneNumber (phone_number) && ! checkIfEntriesMatch(seller.phone_number, phone_number)) {
                res.status(400).send({message: "Phone number already exists"})
                return
            }
            await updateSellerAccountDetails(req.seller.id, first_name, last_name, email, store_id, phone_number, address)
            const updated = await getSellerById(req.seller.id)
            res.status(200).send({message: 'Account details updated', updated})
        } catch (error) { res.status(400).send({message: error.message}) }
    }
    else res.status(400).send({ errno: "103", message: "Please enter all fields" })
}

const deleteSellerAccount = async(req, res) => {
    try {
        const deleteAcct = await deleteSeller(req.seller.id)
        if (deleteAcct) { res.status(200).send({message: "Account deleted!"})
            return
        }
        res.status(400).send({message: "Account does not exist"})
    } catch (error) { res.status(400).send({message: error.message}) }
}

const controllers = {signupSeller, loginSeller, getSellerAccount, updateSellerAccount, deleteSellerAccount, getAllSellersAccounts}

module.exports = controllers