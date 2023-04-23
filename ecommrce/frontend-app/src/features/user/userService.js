import axios from 'axios';
import { base_url, config } from '../../utils/axiosConfig';



const register = async(userData)=>{
    const responce = await axios.post("http://localhost:5000/register", userData);
    if(responce.data){
        return responce.data
    }
}

const login = async(userData)=>{
    const responce = await axios.post("http://localhost:5000/admin-login", userData);
    if(responce.data){
        if (responce.data) {
            localStorage.setItem("customer", JSON.stringify(responce.data))
        }
        return responce.data
    }
}

const forgotPassToken = async(data)=>{
    const responce = await axios.post("http://localhost:5000/forget-password-token", data , config);
    if(responce.data){
        if (responce.data) {
            localStorage.setItem("customer", JSON.stringify(responce.data))
        }
        return responce.data
    }
}

const getUserWishlist = async()=>{
    const responce = await axios.get("http://localhost:5000/get-wishlist", config);
    console.log(responce.data)
    if(responce.data){
        return responce.data
    }
}

const addTocart = async(cardData)=>{
    const responce = await axios.post("http://localhost:5000/users/cart",cardData,  config);
    
    if(responce.data){
        return responce.data
    }
}

const getCart = async()=>{
    const responce = await axios.get("http://localhost:5000/users/getCart",  config);
    
    if(responce.data){
        return responce.data
    }
}

const removeProductFromCart = async(cartItemId)=>{
    const responce = await axios.delete(`http://localhost:5000/cart/removeCart/${cartItemId}`,  config);
    if(responce.data){
        return responce.data
    }
}

const updateProductQuantityFromCart = async(cartDetail)=>{
    const responce = await axios.delete(`http://localhost:5000/cart/update/${cartDetail.cartItemId}/${cartDetail.quantity}`,  config);
    if(responce.data){
        return responce.data
    }
}

const createOrder = async(orderDetail)=>{
    const responce = await axios.post("http://localhost:5000/user/order", orderDetail , config);
    
    if(responce.data){
        return responce.data
    }
}

const getUserOrders = async()=>{
    const responce = await axios.get("http://localhost:5000/user/getMyOrder",  config);
    
    if(responce.data){
        return responce.data
    }
}

const updateAUser = async(data)=>{
    const responce = await axios.put("http://localhost:5000/user/updateUser",data , config)
    if(responce.data){
        return responce.data
    }
}

const resetPass = async(data)=>{
    const responce = await axios.put(`http://localhost:5000/reset-password/${data.token}`, {password:data?.password} )
    if(responce.data){
        return responce.data
    }
}



export const authService = {
    register, login , getUserWishlist, addTocart , getCart , removeProductFromCart , updateProductQuantityFromCart, createOrder , getUserOrders , updateAUser,
    forgotPassToken , resetPass
}