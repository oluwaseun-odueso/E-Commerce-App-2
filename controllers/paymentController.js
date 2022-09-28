const {
    getOrder
} = require('../functions/orderFunctions')
const {
    createData,
    savePayment,
    getAPayment
} = require('../functions/paymentFunctions')
const Payment = require('../utils/paystackPayments')

const initiatePayment = async(req, res) => {
    try {
        const order = await getOrder(req.user.id)
        if (! order) {
            res.status(400).send({message: "Create an order to make payment"})
            return
        }
        const data = await createData(order)
        console.log(data)

        const orderPayment = await Payment.initializeTransaction(data)
        console.log(orderPayment.authorization_url, orderPayment.reference)
        await savePayment(req.user.id, order.dataValues.id, orderPayment.reference, order.dataValues.total, "pending")
        res.status(201).send({message: "Kindly pay through the link below", link: orderPayment.authorization_url})

    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

const getPaymentTransaction = async(req, res) => {
    try {
        const payment = await getAPayment(req.params.id)
        if (! payment) {
            res.status(400).send({message: "No payment made for an order"})
            return
        }
        res.status(200).send({message: 'Order payment details', payment})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

const updatePayment = async(req, res) => {
    try {
        if (req.headers['x-paystack-signature'] == 'unom') {
            const event = req.body
            if (event.event == "charge.success") {
                await updateOrderPaymentStatus(event.reference)
                res.status(200)
            }
        }
        res.send(200);
        res.status(200).send({message: "Successful"})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

const controllers = {
    initiatePayment,
    getPaymentTransaction,
    updatePayment
}

module.exports = controllers