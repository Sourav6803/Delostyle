import axios from 'axios';
import { base_url ,config } from '../../utils/axiosConfig';

// import config from ("../user/userService/config")


const getAllBlogs = async()=>{
    const responce = await axios.get("http://localhost:5000/getAllBlog");
    
    if(responce.data){
        return responce.data
    }
}

const getABlog = async(id)=>{
    const responce = await axios.get(`http://localhost:5000/getBlog/${id}`);
    console.log(responce.data)
    if(responce.data){
        return responce.data
    }
}



export const blogService = {
    getAllBlogs , getABlog
}