const {getStoreID} = require('../functions/sellerFunctions')
const {
    createProduct,
    checkProductDescription
} = require('../functions/productFunctions')

const addProduct = async(req, res) => {
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

const productControllers = {addProduct}

module.exports = productControllers