import axios from "axios";
import { config } from "../../utils/config";

const getBrands = async()=>{
    const responce = await axios.get("http://localhost:5000/get-brand");
    return responce.data 
}

const createBrand = async(brand)=>{
    const responce = await axios.post("http://localhost:5000/create-brand", brand, config);
    return responce.data 
}

const getBrand = async(brandId)=>{
    const responce = await axios.get(`http://localhost:5000/brand/${brandId}`, brandId ,config);
    return responce.data 
}

const updateBrand = async(brandId)=>{
    const responce = await axios.put(`http://localhost:5000/brand/${brandId.id}`, {title: brandId.brandData.title},  config);
    return responce.data 
}

const deleteBrand = async(brandId)=>{
    const responce = await axios.delete(`http://localhost:5000/brand/${brandId}`,  config);
    return responce.data 
}

const bandService = {
    getBrands, createBrand, getBrand ,updateBrand, deleteBrand
}

export default bandService;