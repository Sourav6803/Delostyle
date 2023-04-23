const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({

     user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
     },
     shippingInfo:{
         firstName: { type:String , required: true},
         lastName: { type:String , required: true},
         address: { type:String , required: true},
         city: { type:String , required: true},
         state : { type:String , required: true},
         other : { type:String , required: true},
         pincode : { type:Number , required: true},
     },
     paymentInfo : {
          razorpayOrderId : { type:String , required: true},
          razorpayPaymentId: { type:String , required: true},
     },

     orderItems: [
          {
               product: { 
                    type : mongoose.Schema.Types.ObjectId,
                    ref: 'product',
                    required: true
               },
               color: { 
                    type : mongoose.Schema.Types.ObjectId,
                    ref: 'Colors',
                    required: true
               },
               quantity: {
                    type: Number,
                    required: true
               },
               price : {
                    type: Number,
                    required: true
               }
          },
     ],
     paidAt :  {
          type: Date,
          default : Date.now()
     },
     totalPrice : {
          type : Number,
          required: true
     },
     totalPriceAfterDiscount : {
          type : Number,
          required: true
     },
     orderstatus: {
          type: String,
          default : "Ordered",
          //enum : ["Not Proceed", "Cash On Delivery", "Processing","Dispatched","Cancelled","Delivered"]
     },
}, { timestamps: true })

module.exports = mongoose.model('order', orderSchema)