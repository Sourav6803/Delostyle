import axios from "axios";
import { config } from "../../utils/config";

const getProducts = async()=>{
    const responce = await axios.get("http://localhost:5000/all-products");
    return responce.data 
}

const createProduct = async(product)=>{
    const responce = await axios.post("http://localhost:5000/products", product, config);
    return responce.data 
}

const productService = {
    getProducts,
    createProduct
}


export default productService;