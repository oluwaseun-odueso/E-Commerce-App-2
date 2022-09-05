const {
    createAStore,
    checkName,
} = require('../functions/storeFunctions')

const createStore = async(req, res) => {
    if ( req.body.name && req.body.address) {
        const {name, address} = req.body
        try {
            if (await checkName(name)){ res.status(400).send({message: "Shop already exists"}) 
                return
            }
            const store = await createAStore(req.seller.id, name, address)
            res.status(201).send({ message : "Store created", store})
        } catch (error) { res.status(400).send({message: error.message}) }
    } else { res.status(400).json({ errno: "101", message: "Please enter all fields" }) }
}

const controllers = {createStore}

module.exports = controllers