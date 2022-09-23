const {
    getOrder
} = require('../functions/orderFunctions')
const {
    createData
} = require('../functions/paymentFunctions')
const Payment = require('../utils/paystackPayments')

const initiatePayment = async(req, res) => {
    try {
        const order = await getOrder(req.user.id)
        if (! order) {
            res.status(400).send({message: "You do not have an order to pay for, create an order to make payment."})
            return
        }
        const data = createData(order)
        // console.log(order.dataValues.payment_status)
        // res.status(200).send(order)
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

const controllers = {
    initiatePayment
}

module.exports = controllers