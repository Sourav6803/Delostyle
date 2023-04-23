const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const cartSchema = new mongoose.Schema(
    {
        userId: {
             type: mongoose.Schema.Types.ObjectId,
             ref: 'User',
               
        },
        // user:{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User',
        // },
        productId: {
            type: ObjectId,
            ref: "product",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true,
        },
        color: {
            type: ObjectId,
            ref: "Colors"
        },
        availableSizes: [{
            type: String,
            trim: true,
            enum: ["S", "XS", "M", "X", "L", "XXL", "XL" , "28" , "32", "36" , "38","40","42"]
       }],

    }, { timestamps: true })

module.exports = mongoose.model("cart", cartSchema);