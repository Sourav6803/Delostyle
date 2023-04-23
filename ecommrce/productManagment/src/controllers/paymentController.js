const mongoose = require('mongoose');
const Razorpay = require("razorpay");

const instance = new Razorpay({ key_id: 'rzp_test_MWGrsV7pLRV98m', key_secret: 'ROnnZYB1j1pO0Q83KM3c79pn' })

const checkOut = async function(req,res){
    try{
        let {amount} = req.body
        const option = {
            amount: amount*100,
            currency: "INR"
        }   
      let order = await instance.orders.create(option) 
         
      res.status(201).send( order)
    }
    catch(error){
        return res.status(400).send({status:false, msg : error})
    }
}

const paymentVerification = async(req,res)=>{
    
    const {razorpayOrderId, razorpayPaymentId} = req.body
    
    return res.status(201).send({ status: true,razorpayOrderId , razorpayPaymentId})
}

module.exports = {checkOut , paymentVerification}