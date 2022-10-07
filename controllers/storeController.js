const {uploadFile} = require('../images/s3')
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const {updateSellerStoreId} = require('../functions/sellerFunctions')

const {
    createAStore,
    checkStoreName,
    getStoreById,
    getStoreIdByStoreName,
    updateStoreDetails,
    checkIfEntriesMatch,
    deleteAStore,
    checkIfSellerHasStore,
    saveStoreImageKey
} = require('../functions/storeFunctions')

const createStore = async(req, res) => {
    if ( req.body.name && req.body.address ) {
        const {name, address} = req.body
        try {
            if (await checkIfSellerHasStore(req.seller.id)){
                res.status(400).send({message: "Cannot create store, you already have a store"})
                return
            }
            if (await checkStoreName(name)){ 
                res.status(400).send({message: "Shop already exists"}) 
                return
            }

            const store = await createAStore(req.seller.id, name, address)
            const store_id = await getStoreIdByStoreName(name)
            await updateSellerStoreId(req.seller.id, store_id)
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
        try {
            const store = await getStoreById(req.params.id, req.seller.id)
            if (! store ) {
                res.status(400).send({message: "Store does not exist"})
                return 
            }
            if ( await checkStoreName(name) && ! checkIfEntriesMatch(store.name, name)) {
                res.status(400).send({message: "Store name already exists"})
                return
            }

            await updateStoreDetails(req.params.id, req.seller.id, name, address)
            const updated = await getStoreById(req.params.id, req.seller.id)
            res.status(200).send({message: 'Store updated', updated}) 

        } catch (error) { res.status(400).send({message: error.message}) }
    } else { res.status(400).json({ errno: "101", message: "Please enter all fields" }) }
}

const deleteStore = async(req, res) => {
    try {
        const store = await deleteAStore(req.params.id, req.seller.id)
        if ( ! store) {
            res.status(400).send({message: "Store does not exist"})
            return
        }
        res.status(200).send({message: "Store closed"})
    } catch (error) { res.send({message : error.message}) }
}

const uploadStoreImage = async(req, res) => {
    try {
        const file = req.file
        const result = await uploadFile(file)
        await unlinkFile(file.path)
        await saveStoreImageKey(req.params.id, result.Key)
        res.status(200).send({message: "Store image uploaded successfully"})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

const controllers = {
    createStore, 
    getStore, 
    updateStore, 
    deleteStore,
    uploadStoreImage
}

module.exports = controllers