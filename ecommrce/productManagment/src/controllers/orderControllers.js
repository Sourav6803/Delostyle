const userModel = require("../models/userModel.js");
const orderModel = require("../models/orderModel.js");
const cartModel = require("../models/cartModel.js");
const mongoose = require('mongoose');
const Razorpay = require("razorpay");
// const shortID = require("shortid")

// const isValid = function (value) {
//   if (typeof value === "undefined" || value === null) return false;
//   if (typeof value === "string" && value.trim().length === 0) return false;
//   if (typeof value != "string") return false;
//   return true;
// };



// const getAllOrders = async function(req,res){
//   try{
//     let order = await orderModel.find().populate("userId",{fname:1,lname:1})
    
//     return res.send(order)
//   }
//   catch(err){
//     return res.status(500).send({ status: false, message: err.message })
//   }
// }

// const updateOrder = async function (req, res) {
//   try {
//     let userId = req.params.userId;


//     if (!isValid(userId)) return res.status(400).send({ msg: "Please enter userId" })
//     if (!mongoose.isValidObjectId(userId)) {
//       return res.status(400).send({ status: false, msg: "userId is not valid" });
//     }

//     let user = await userModel.findById(userId);

//     if (!user) {
//       return res.status(404).send({ status: false, msg: "user  not found" });
//     } 
//     if (req.userId != userId) return res.status(403).send({ status: false, message: "Authorization failed" });


//     let data = req.body;
//     let { orderId, status } = data;

//     if (Object.keys(data).length == 0) {
//       return res.status(400).send({ status: false, msg: "please fill the data" });
//     }


//     if (!isValid(orderId)) return res.status(400).send({ status: false, msg: "Please enter orderId" });
//     if (!mongoose.isValidObjectId(orderId)) return res.status(400).send({ status: false, msg: "OrderId is not valid" });

//     if (!isValid(status)) return res.status(400).send({ status: false, message: "status is required to update order" });


//     let order = await orderModel.findOne({ _id: orderId, isDeleted: false })

//     if (!order) return res.status(404)({ status: false, msg: "Order not Found" });
//     if (order.status != "pending") return res.status(400).send({ status: false, msg: `order-status is already ${order.status}` });


//     if (order.userId != userId) return res.status(400).send({ status: false, msg: "Make sure OrderId and UserId is correct" });

//     let validStatus = ["completed", "cancelled"];
//     if (!validStatus.includes(status)) return res.status(400).send({ status: false, message: "status should be  completed or cancelled" });


//     if (status == "cancelled") {
//       if (order.cancellable == false) { return res.status(400).send({ status: false, message: "This order is not cancellable" }); }
//     }

//     const updateOrder = await orderModel.findOneAndUpdate(
//       { _id: orderId },
//       { status: status },
//       { new: true }
//     );
//     return res.status(200).send({ status: true, message: "Order updated successfully", data: updateOrder, });
//   } catch (err) {
//     return res.status(500).send({ status: false, message: err.message })
//   }
// };








const createOrder = async(req,res)=>{
  
  const _id = req.userId
  const {shippingInfo , orderItems , totalPrice , totalPriceAfterDiscount , paymentInfo} = req.body
  if(shippingInfo == null) return res.status(400).send({message:"Please enter your shipping info"})
  const order = await orderModel.create({
    shippingInfo , orderItems , totalPrice , totalPriceAfterDiscount , paymentInfo , user: _id
  })
  res.status(201).send({status:true , order})
}

const getMyOrder = async(req,res)=>{
  try{
    const id = req.userId
    const order = await orderModel.find({user: id}).populate('user').populate('orderItems.product').populate('orderItems.color')
    return res.status(200).send(order)

  }
  catch(error){
    return res.status(500).send({status:false,msg:error})
  }
}


 module.exports = { createOrder, getMyOrder }



