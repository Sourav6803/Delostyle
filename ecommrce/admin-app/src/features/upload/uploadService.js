import axios from 'axios';
import {config} from "../../utils/config"

const uploadImg = async (data) =>{
   const responce = await axios.post("http://localhost:5000/img", data, config)
   return responce.data
}

const deleteImg = async (id) =>{
    const responce = await axios.delete("", id, config)
    return responce.data
 }

const uploadservice = {
    uploadImg , deleteImg
}

export default uploadservice;