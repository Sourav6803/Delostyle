import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice"

import contactReducers  from "../features/contact/contactSlice"



export const store = configureStore({
    reducer: {
        auth: authReducer,
        
        contact: contactReducers,
       
    }
})