const crypto = require('crypto')
require('dotenv').config()
const secret = process.env.PAYSTACK_TOKEN;
const {
    getOrder
} = require('../functions/orderFunctions')
const {
    createData,
    savePayment,
    getAPayment,
    updateOrderPaymentStatus
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
        const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
        console.log(hash)
        if (hash == req.headers['x-paystack-signature']) {
            const event = req.body
            console.log(event)
            if (event.event == "charge.success") {
                await updateOrderPaymentStatus(event.data.reference, "paid")
                res.status(200).send({message: "Payment sucessful"})
                return
            }
        }
        res.status(200).send("Payment failed");
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