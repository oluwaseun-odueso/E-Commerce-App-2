const {getProductById} = require('../functions/productFunctions')
const {
    createOrder,
    getOrder
} = require('../functions/orderFunctions')

const addOrder = async(req, res) => {
    if (req.body.product_id && req.body.quantity) {
        const {product_id, quantity} = req.body
        try {
            const product = await getProductById(product_id)
            if (! product) {
                res.status(400).send({message: "Product does not exist"})
                return
            }
            await createOrder(req.user.id, product_id, quantity, product.price * quantity)
            const order = await getOrder(req.user.id)
            res.status(201).send({message: "Product added to order", order})
        } catch (error) { res.status(400).send({message: error.message}) }
    } else res.status(400).json({ errno: "101", message: "Please enter all fields" })
}

const controllers = {
    addOrder
}

module.exports = controllers