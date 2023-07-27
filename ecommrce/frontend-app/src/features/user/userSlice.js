import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { authService } from "./userService";



export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        return await authService.register(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const loginUser = createAsyncThunk("loged/register", async (userData, thunkAPI) => {
    try {
        return await authService.login(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateProfile = createAsyncThunk("user/profile/update", async (data, thunkAPI) => {
    try {
        return  await authService.updateAUser(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const forgotPasswordToken = createAsyncThunk("user/password/token", async (data, thunkAPI) => {
    try {
        return  await authService.forgotPassToken(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const resetPassword = createAsyncThunk("user/password/reset", async (data, thunkAPI) => {
    try {
        return  await authService.resetPass(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


const getCustomerFromLocalStorage = localStorage.getItem('customer') 
console.log(getCustomerFromLocalStorage)

const initialState = {
    user: getCustomerFromLocalStorage,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdUser = action.payload;
                if (state.isSuccess === true) {
                    toast.info(action.payload.message)
                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.responce.data.message)
                }
            })

            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.logedUser = action.payload;
                if (state.isSuccess === true) {
                    localStorage.setItem("token", action.payload.token)
                    toast.info(action.payload.message)
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess === false) {
                    toast.error(action.payload.responce.message)
                }
            })

            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedUser = action.payload;
                if(state.isSuccess){
                    toast.success("Profile Updated Successfully ")
                }
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;

                if(state.isError){
                    toast.error("Something went wrong")
                }
            })

            .addCase(forgotPasswordToken.pending, (state) => {
                state.isLoading = true
            })
            .addCase(forgotPasswordToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.token = action.payload;
                if(state.isSuccess){
                    toast.success("Forget Password Email send Successfully ")
                }
            })
            .addCase(forgotPasswordToken.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError){
                    toast.error("Something went wrong")
                }
            })

            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.password = action.payload;
                if(state.isSuccess){
                    toast.success("Password Updated Successfully ")
                }
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError){
                    toast.error("Something went wrong")
                }
            })
            
    },
})

export default authSlice.reducer;