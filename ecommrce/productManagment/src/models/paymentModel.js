const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const paymentSchema = new mongoose.Schema({
    cartId: {
        type: ObjectId,
        ref: 'cart',
    },
    amount: DataTypes.DOUBLE,
    method: DataTypes.STRING,
    currency: DataTypes.STRING,
    orderCreationId: DataTypes.STRING,
    razorpayPaymentId: DataTypes.STRING,
    razorpayOrderId: DataTypes.STRING
})

module.exports = mongoose.model("Payment", paymentSchema)