import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({children}) =>{
   const geTokenFromLocalStorage = JSON.parse(localStorage.getItem("customer"))
   return geTokenFromLocalStorage?.token !== undefined ? children : (<Navigate to='/login' replace={true} />)
}