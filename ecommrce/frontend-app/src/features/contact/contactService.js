import axios from 'axios';
import { base_url ,config } from '../../utils/axiosConfig';

// import config from ("../user/userService/config")

const postQuery = async(data)=>{
    const responce = await axios.post("http://localhost:5000/create-enq" , data);
    
    if(responce.data){
        return responce.data
    }
}

const getAllenq = async()=>{
    const responce = await axios.get("http://localhost:5000/allEnq");
    
    if(responce.data){
        return responce.data
    }
}

const getAEnq = async(id)=>{
    const responce = await axios.get(`http://localhost:5000/enq/${id}`);
    
    if(responce.data){
        return responce.data
    }
}



export const contactService = {
    postQuery, getAllenq , getAEnq
}