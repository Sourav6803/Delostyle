const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const productSchema = new mongoose.Schema({

     title: {
          type: String,
          lowercase: true,
          required: true,
          trim: true
     },
     description: {
          type: String,
          required: true,
          trim: true
     },
     brand: {
          type: String
     },
     price: {
          type: Number,
          required: true,
          trim: true
     },
     currencyId: {
          type: String,
          uppercase: true,
          default: "INR",
          trim: true
     },
     currencyFormat: {
          type: String,
          default: "₹",
          trim: true
     },
     category: {
          type : String
     },
     subCategory: {
          type : String
     },
     isFreeShipping: {
          type: Boolean,
          default: false
     },
     productImage: [{
          type: String,
          trim: true
     }],
     color: [{type : mongoose.Schema.Types.ObjectId , ref: "Colors"}],
     quantity: {
          type: Number
     },
     sold: {
          type: Number,
          default: 0
     },
     ratings : [
          {
               star: Number,
          comment: String,
          postedby: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
          }
     ],
          
     
     totalRating:{
          type: Number,
          default: 0
     },
     tags: {
          type: String,
     },
     style: {
          type: String,
          trim: true
     },
     availableSizes: [{
          type: String,
          // required: true,
          trim: true,
          enum: ["S", "XS", "M", "X", "L", "XXL", "XL" , "28" , "32", "36" , "38","40","42"]
     }],
     installments: {
          type: Number,
          trim: true
     },
     deletedAt: {
          type: Date,
          default: null
     },
     isDeleted: {
          type: Boolean,
          default: false
     },
     // images: [
     //      {
     //           public_id: String,
     //           url: String
     //      }
     // ]

}, { timestamps: true })

module.exports = mongoose.model("product", productSchema)