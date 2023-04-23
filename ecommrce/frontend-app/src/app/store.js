import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice"
import productReducer from "../features/product/productSlice"
import blogReducer from "../features/blogs/blogSlice"
import contactReducers  from "../features/contact/contactSlice"



export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        blog: blogReducer,
        contact: contactReducers,
       
    }
})