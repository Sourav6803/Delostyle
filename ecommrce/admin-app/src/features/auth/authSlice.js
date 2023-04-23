import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";


const getuserFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

export const initialState = {
    user: getuserFromLocalStorage,
    orders: [],
    isError: false,
    isLoading: false,
    isSucces: false,
    message: ""
}

export const login = createAsyncThunk('auth/admin-login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getOrders = createAsyncThunk('order/get-orders', async (thunkAPI) => {
    try {
        return await authService.getOrders();
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSucces = true;
                state.user = action.payload
            })
            .addCase(login.rejected, (state,  action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSucces = false;
                state.user = null;
                state.message = action.error;
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSucces = true;
                state.orders = action.payload;
                state.message = "success"
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error;
                state.isLoading = false
            })
    }
})

export default authSlice.reducer