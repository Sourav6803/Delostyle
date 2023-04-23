import axios from "axios";
import { config } from "../../utils/config";

const getCoupons = async()=>{
    const responce = await axios.get("http://localhost:5000/get-coupon");
    return responce.data 
}

const createCoupon = async(coupon)=>{
    const responce = await axios.post("http://localhost:5000/create-coupon", coupon, config);
    return responce.data 
}

const getCoupon = async(couponId)=>{
    
    const responce = await axios.get(`http://localhost:5000/coupon/${couponId}`, couponId ,config);
    return responce.data 
}
const updateCoupon = async(couponId)=>{
    const responce = await axios.put(`http://localhost:5000/coupon/${couponId.id}`, {name: couponId.couponData.name,expiry:couponId.couponData.expiry , discount : couponId.couponData.discount },  config);  //{title: couponId.couponData.title},
    return responce.data 
}

const deleteCoupon = async(couponId)=>{
    const responce = await axios.delete(`http://localhost:5000/coupon/${couponId}`,  config);
    return responce.data 
}

const couponService = {
    getCoupons, createCoupon , getCoupon , updateCoupon , deleteCoupon
}

export default couponService;