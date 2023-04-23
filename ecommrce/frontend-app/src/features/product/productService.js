import axios from 'axios';
import { base_url ,config } from '../../utils/axiosConfig';


const getProducts = async(data)=>{
    const responce = await axios.get(`http://localhost:5000/all-products?${data?.brand?`brand=${data?.brand}&&`:""}${data?.tag?`tags=${data?.tag}&&`:""}${data?.category?`category=${data?.category}&&`:""}${data?.minPrice?`price[gte]=${data?.minPrice}&&`:""}${data?.maxPrice?`price[lte]=${data?.maxPrice}&&`:""}${data?.sorts?`sort=${data?.sorts}&&`:""}`);
    if(responce.data){
        return responce.data
    }
}

const getSingleProduct = async(productId)=>{
    const responce = await axios.get(`http://localhost:5000/products/${productId}`);
    if(responce.data){
        return responce.data
    }
}

const addToWishlist = async(prodId)=>{
    const responce = await axios.put("http://localhost:5000/wishlist", {prodId} , config);
    if(responce.data){
        return responce.data
    }
}

const rateProduct = async(data)=>{
    const responce = await axios.put("http://localhost:5000/rating", data , config);
    if(responce.data){
        return responce.data
    }
}

export const productService = {
    getProducts , addToWishlist , getSingleProduct , rateProduct
}

