const {
    createAStore,
    checkName,
    getStoreById,
    updateStoreDetails,
    checkIfEntriesMatch,
    deleteAStore
} = require('../functions/storeFunctions')
// const { checkIfEntriesMatch } = require('../functions/userFunctions')

const createStore = async(req, res) => {
    if ( req.body.name && req.body.address ) {
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

const getStore = async(req, res) => {
    try {
        const store = await getStoreById(req.params.id, req.seller.id)
        if ( ! store) {
            res.status(400).send({ message: "Store does not exist" })
            return
        }
        res.status(200).send({store})
    } catch (error) { res.status(400).send({message: error.message}) }
}

const updateStore = async(req, res) => {
    if ( req.body.name && req.body.address ) {
        const {name, address} = req.body
        const store = await getStoreById(req.params.id, req.seller.id)
        try {
            if (! store) {
                res.status(400).send({message: "Store does not exist"})
                return 
            }
            if ( await checkName(name) && ! checkIfEntriesMatch(store.name, name)) {
                res.status(400).send({message: "Store name already exists"})
                return
            }

            await updateStoreDetails(req.params.id, req.seller.id, name, address)
            const updated = await getStoreById(req.params.id, req.seller.id)
            res.status(200).send({message: 'Store details updated', updated}) 

        } catch (error) { res.status(400).send({message: error.message}) }
    } else { res.status(400).json({ errno: "101", message: "Please enter all fields" }) }
}

const deleteStore = async(req, res) => {
    try {
        const store = await deleteAStore(req.params.id, req.seller.id)
        if (store) {
            res.status(200).send({message: "Store has been closed"})
            return
        }
        res.status(400).send({message: "Store does not exist"})
    } catch (error) { res.send({message : error.message}) }
}

const controllers = {createStore, getStore, updateStore, deleteStore}

module.exports = controllers