const couponModel = require("../models/couponModel");
const mongoose = require('mongoose')

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    if (typeof value != "string") return false;
    return true;
};

const createCoupon = async function (req, res) {
    res.setHeader("Access-Control-Allow-Origin",'*')
    try {
        let data = req.body
        const { name,expiry,discount  } = data
        const coupon = await couponModel.create(data)
        return res.status(201).send( coupon)
    }
    catch (error) {
        return res.status(500).send({ message: false, err: error.message })
    }
}

const getCoupon = async function (req, res) {
    
    try {
        let data = await couponModel.find({isDeleted : false})
        return res.send(data)
    }
    catch {
        return res.status(500).send({ message: false, err: error })
    }
}


const getCouponById = async function(req,res){
    res.setHeader("Access-Control-Allow-Origin",'*')
    try{
        let couponId = req.params.couponId;
        let coupon = await couponModel.findById(couponId)
        if (!coupon) return res.status(404).send({ status: false, msg: "The given couponId is not there in database" })
        if (coupon.isDeleted == true) return res.status(400).send({ status: false, msg: "The coupon is deleted" })
        return res.status(200).send(coupon)
    }
    catch(err){
        return res.status(500).send({ message: false, err: err.message })
    }
}

const updateCoupon = async function(req,res){
    res.setHeader("Access-Control-Allow-Origin",'*')
    try{
        let couponId = req.params.couponId;
        if (!isValid(couponId)) return res.status(400).send({ msg: "Please enter couponId" })
        if (!mongoose.isValidObjectId(couponId)) return res.status(400).send({ status: false, msg: "couponId is not valid" });
        let data = req.body
        let {name , expiry , discount} = data
        let coupon = await couponModel.findById(couponId)
        if (!coupon) return res.status(404).send({ status: false, msg: "couponId is not present in DB " })
        if (coupon.isDeleted == true) return res.status(400).send({ status: false, msg: "Coupon is Deleted" })
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Noting to Update in Request from Body" });
        }

        if (name != null) {
            // check it is valid title or not? (using regular expression)
            let findName = await couponModel.findOne({ name: name })
            if (findName) {
                return res.status(400).send({ status: false, msg: "Nmae is Already Present in DB" })
            }
            coupon.name = name
        }
        if (expiry != null) {
            if (!isValid(expiry)) return res.status(400).send({ status: false, msg: "expiry invalid " })
            coupon.expiry = expiry
        }
        // if (discount != null) {
        //     if (!isValid(discount)) return res.status(400).send({ status: false, msg: "discount invalid " })
        //     coupon.expiry = expiry
        // }
        coupon.save()
 
        return res.status(200).send( {coupon: coupon} );
    }
    catch(err){
        return res.status(500).send({ message: false, err: err.message })
    }
}

const deletedCoupon = async function (req, res) {
    try {
        let couponId = req.params.couponId;

        if (!isValid(couponId)) return res.status(400).send({ msg: "Please enter couponId" })
        if (!mongoose.isValidObjectId(couponId)) return res.status(400).send({ status: false, msg: "couponId is Invalid" })

        let coupon = await couponModel.findById(couponId)
        if (!coupon) return res.status(404).send({ status: false, msg: "Coupon is not present" })

        //check if isDeleated Status is True
        if (coupon.isDeleted) {
            return res.status(404).send({ status: false, msg: "Coupon is already Deleted" })
        }

        //update the status of isDeleted to TRUE
        await couponModel.findOneAndUpdate({ _id: couponId, isDeleted: false }, { isDeleted: true, deletedAt: new Date(), });

        return res.status(200).send( {message: "successfuly Deleted"} );
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }

}


module.exports = {createCoupon, getCoupon , getCouponById , updateCoupon , deletedCoupon}