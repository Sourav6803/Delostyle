const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    expiry: {
        type: Date,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    deletedAt: {
        type: Date,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },

}, { timestamps: true })

module.exports = mongoose.model("Coupons", couponSchema)