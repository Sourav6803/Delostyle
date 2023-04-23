import axios from "axios";
import { config } from "../../utils/config";

const getBlog = async()=>{
    const responce = await axios.get("http://localhost:5000/blog");
    return responce.data 
}

const createBlog = async(blog)=>{
    const responce = await axios.post("", blog, config);
    return responce.data 
}

const blogService = {
    getBlog , createBlog
}

export default blogService;