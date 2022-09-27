const {
    getOrder
} = require('../functions/orderFunctions')
const {
    createData,
    savePayment
} = require('../functions/paymentFunctions')
const Payment = require('../utils/paystackPayments')

const initiatePayment = async(req, res) => {
    try {
        const order = await getOrder(req.user.id)
        if (! order) {
            res.status(400).send({message: "You do not have an order to pay for, create an order to make payment."})
            return
        }
        const data = await createData(order)
        console.log(data)

        const orderPayment = await Payment.initializeTransaction(data)
        console.log(orderPayment.authorization_url, orderPayment.reference)
        await savePayment(req.user.id, order.dataValues.id, order.dataValues.total, "pending")
        res.status(201).send({message: "Kindly pay through the link below", link: orderPayment.authorization_url})

    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

const controllers = {
    initiatePayment
}

module.exports = controllers