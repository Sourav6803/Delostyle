import axios from "axios";
import { config } from "../../utils/config";


const getColors = async()=>{
    const responce = await axios.get("http://localhost:5000/get-color");
    return responce.data 
   
}

const createColor = async(color)=>{
    const responce = await axios.post("http://localhost:5000/create-color", color, config);
    return responce.data 
}



const colorService = {
    getColors , createColor
}

export default colorService;