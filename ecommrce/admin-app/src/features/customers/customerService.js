import axios from "axios";

const getUsers = async()=>{
    const responce = await axios.get("http://localhost:5000/all-users");
    // console.log( "from customer",responce.data )
    return responce.data 
}



const customerService = {
    getUsers
}


export default customerService;
