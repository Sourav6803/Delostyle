import axios from "axios";
import { config } from "../../utils/config";

const getBlogCategories = async()=>{
    const responce = await axios.get("");
    return responce.data 
}

const createBlogCategory = async(blogCategory)=>{
    const responce = await axios.post("", blogCategory, config);
    return responce.data 
}

const bCategoryService = {
    getBlogCategories , createBlogCategory
}

export default bCategoryService;