const {
    getProductById, 
    checkIfProductsExist,
    checkProductOrderQuantity
} = require('../functions/productFunctions')
const {
    getOrder,
    createOrder,
    deleteOrder,
    getTotalPrice,
    getProductsPrices,
    checkIfUserHasOrder,
    getProductIdsForUserOrder,
    checkIfIdsExistsInUserOrder,
    getPriceForQuantitiesOrdered,
    convertProductIdsFromDatabaseToArray
} = require('../functions/orderFunctions')

const addUserOrder = async(req, res) => {
    if (req.body.product_ids && req.body.product_quantities) {
        const {product_ids, product_quantities} = req.body
        try {
            if (await checkIfUserHasOrder(req.user.id)) {
                res.status(400).send({message: "Pay for or delete previous order to create a new one"})
                return
            }

            const returnId = await checkIfProductsExist(product_ids)
            if (returnId) {
                res.status(400).send({message: `Product with id ${returnId} does not exist`})
                return
            }

            const excessItem = await checkProductOrderQuantity(product_ids, product_quantities)
            console.log(excess)
            if (excessItem) {
                res.status(400).send({message: `${excessItem} order quantity higher than quantity in stock`})
                return
            }

            const individualPrice  = await getProductsPrices(product_ids)
            const price = getPriceForQuantitiesOrdered(individualPrice, product_quantities)
            const total = getTotalPrice(price)

            await createOrder(req.user.id, product_ids.toString(), product_quantities.toString(), price.toString(), total, "not paid")
            const order = await getOrder(req.user.id)
            res.status(201).send({message: "Order created", order})

        } catch (error) { res.status(400).send({message: error.message}) }
    } else res.status(400).json({ errno: "101", message: "Please enter all fields" })
}

const updateOrderProduct = async(req, res) => {
    if (req.body.product_ids && req.body.product_quantities) {
        try {
        
        } catch (error) { res.status(400).send({message: error.message}) }
    } else res.status(400).json({ errno: "101", message: "Please enter all fields" })
}

const getUserOrder = async(req, res) => {
    try {
        const order = await getOrder(req.user.id)
        if (order == '') {
            res.status(400).send({message: "You don't have an order"})
            return
        }
        res.status(200).send({message: "Your order", order})
    } catch (error) { res.status(400).send({message: error.message}) }
}

const deleteUserOrder = async(req, res) => {
    try {
        const order = await getOrder(req.user.id)
        if (order == '') {
            res.status(400).send({message: "You don't have an order"})
            return
        }
        await deleteOrder(req.user.id)
        res.status(200).send({message: "Your order has been deleted"})
    } catch (error) { res.status(400).send({message: error.message}) }
}

const deleteProductFromOrder = async(req, res) => {
    if (req.body.product_ids) {
        const {product_ids} = req.body
        try {
            const currentIds = await getProductIdsForUserOrder(req.user.id)
            const currentIdsArray = convertProductIdsFromDatabaseToArray(currentIds)
            const notExistingId = checkIfIdsExistsInUserOrder(product_ids, currentIdsArray)

            if (notExistingId) {
                res.status(400).send({messsage: `Product with id ${notExistingId} doesn't exist in order`})
                return
            }

        } catch (error) { res.status(400).send({message: error.message}) }
    }
    else res.status(400).send({message: "Enter product(s) to delete"})
}

const controllers = {
    addUserOrder,
    getUserOrder,
    deleteUserOrder,
    updateOrderProduct,
    deleteProductFromOrder
}

module.exports = controllers