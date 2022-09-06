const {getStoreID} = require('../functions/sellerFunctions')
const {
    createProduct,
    checkProductDescription,
    getProductById,
    getProducts
} = require('../functions/productFunctions')

const addProduct = async (req, res) => {
    if (req.body.product_description && req.body.price && req.body.quantity_in_stock) {
        const {product_description, price, quantity_in_stock} = req.body
        try {
            const storeId = await getStoreID(req.seller.id)
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

const productControllers = {addProduct, getProduct, getAllProducts}

module.exports = productControllers