const {getSellerStoreID} = require('../functions/sellerFunctions')
const {
    createProduct,
    checkProductDescription,
    getProductById,
    getProducts,
    updateProductDetails,
    deleteAProduct
} = require('../functions/productFunctions')
const { checkIfEntriesMatch } = require('../functions/storeFunctions')

const addProduct = async (req, res) => {
    if (req.body.product_description && req.body.price && req.body.quantity_in_stock) {
        const {product_description, price, quantity_in_stock} = req.body
        try {
            const storeId = await getSellerStoreID(req.seller.id)
            const store_id = JSON.parse(JSON.stringify(storeId)).store_id
            if (await checkProductDescription(product_description)) {
                res.status(400).send({message: "Product name already exists"}) 
                return
            }
            const product = await createProduct(store_id, req.seller.id, product_description, price, quantity_in_stock)
            res.status(201).send({message: "Product added", product})
        } catch (error) { res.status(400).send({message: error.message}) }
    } else res.status(400).json({ errno: "101", message: "Please enter all fields" })
}

const getProduct = async (req, res) => {
    try {
        const product = await getProductById(req.params.id)
        if ( ! product) {
            res.status(400).send({ message: "Product does not exist" })
            return
        }
        res.status(200).send({product})
    } catch (error) {res.status(400).send({message: error.message})}
}

const getAllProducts = async (req, res) => {
    try {
        const products = await getProducts()
        if (products == "") {
            res.status(400).send({message: "There are no products available"})
            return
        }
        res.status(200).send({message: "Available products", products})
    } catch (error) {res.status(400).send({message: error.message})}
}

const updateProduct = async (req, res) => {
    if (req.body.product_description && req.body.price && req.body.quantity_in_stock) {
        const {product_description, price, quantity_in_stock} = req.body
        try {
            const product = await getProductById(req.params.id)
            if (! product ) {
                res.status(400).send({message: "Product does not exist"})
                return 
            }
            if (await checkProductDescription(product_description) && ! checkIfEntriesMatch(product.product_description, product_description)) {
                res.status(400).send({message: "Product description already exists"})
                return
            }
            await updateProductDetails(req.params.id, req.seller.id, product_description, price, quantity_in_stock)
            const updated = await getProductById(req.params.id)
            res.status(200).send({message: 'Product updated', updated}) 
        } catch (error) {res.status(400).send({message: error.message})}
    } else res.status(400).json({ errno: "101", message: "Please enter all fields" })
}

const deleteProduct = async (req, res) => {
    try {
        const productToBeDeleted = await getProductById(req.params.id, req.seller.id)
        if ( ! productToBeDeleted) {
            res.status(400).send({message: 'Product does not exist'})
        }
        await deleteAProduct(req.params.id, req.seller.id)
        res.status(200).send({message: "Product deleted"})
    } catch (error) { res.status(400).send({message: error.message}) }
}

const productControllers = {addProduct, getProduct, getAllProducts, updateProduct, deleteProduct}

module.exports = productControllers