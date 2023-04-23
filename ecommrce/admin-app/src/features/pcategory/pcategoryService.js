import axios from "axios";
import { config } from "../../utils/config";

const getProductCategories = async()=>{
    const responce = await axios.get("http://localhost:5000/get-category");
    return responce.data 
}

const getProductCategory = async(categoryId)=>{
    const responce = await axios.get(`http://localhost:5000/category/${categoryId}`, categoryId , config);
    return responce.data 
}

const createProductCategory = async(category)=>{
    const responce = await axios.post("http://localhost:5000/create-category", category, config);
    return responce.data 
}

const updateProductCategory = async(categoryId)=>{
    console.log(categoryId)
    const responce = await axios.put(`http://localhost:5000/category/${categoryId.id}`, {title: categoryId.pCatData.title},  config);
    return responce.data 
}

const deleteProductCategory = async(categoryId)=>{
    const responce = await axios.delete(`http://localhost:5000/category/${categoryId}`,  config);
    return responce.data 
}


const pCategoryService = {
    getProductCategories, getProductCategory , createProductCategory , updateProductCategory , deleteProductCategory
}

export default pCategoryService;