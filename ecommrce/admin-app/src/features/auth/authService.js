import axios from "axios";

const getTokenFromLocalstorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const config = {
     headers: { Authorization: `Bearer ${getTokenFromLocalstorage.token}` },
     Accept : "appcliation/json",
}


const login = async (userData) => {
    const responce = await axios.post("http://localhost:5000/admin-login", userData)
    if (responce.data) {
        localStorage.setItem("user", JSON.stringify(responce.data))
    }
    return responce.data
}

const getOrders = async()=>{
    
    const responce = await axios.get("http://localhost:5000/users/all-orders", config);
    return responce.data 
    
}

const authService = {
    login,
    getOrders
}

export default authService;


// `${base_url}/admin-login`