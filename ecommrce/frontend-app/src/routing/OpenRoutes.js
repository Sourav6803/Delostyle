import { Navigate } from "react-router-dom";

export const OpenRoutes = ({children}) =>{
   const geTokenFromLocalStorage = JSON.parse(localStorage.getItem("customer"))
   return geTokenFromLocalStorage?.token === undefined ? children : (<Navigate to='/' replace={true} />)
}