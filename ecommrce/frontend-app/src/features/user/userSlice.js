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

export const getUserProductWishlist = createAsyncThunk("user/wishlist", async (thunkAPI) => {
    try {
        return  await authService.getUserWishlist()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const addProductToCart = createAsyncThunk("user/cart/add", async (cardData ,thunkAPI) => {
    try {
        return  await authService.addTocart(cardData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const getUserCart = createAsyncThunk("user/cart/get", async ( thunkAPI) => {
    try {
        return  await authService.getCart()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteCartProduct = createAsyncThunk("user/cart/product/delete", async (id, thunkAPI) => {
    try {
        return  await authService.removeProductFromCart(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateCartProduct = createAsyncThunk("user/cart/product/update", async (cartDetail, thunkAPI) => {
    try {
        return  await authService.updateProductQuantityFromCart(cartDetail)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createAnOrder = createAsyncThunk("user/cart/createOrder", async (cartDetail, thunkAPI) => {
    try {
        return  await authService.createOrder(cartDetail)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getOrders = createAsyncThunk("user/oreder/get", async ( thunkAPI) => {
    try {
        return  await authService.getUserOrders()
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


const getCustomerFromLocalStorage = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : null;


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
                    toast.info(action.error)
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
                    toast.info(action.payload.message)
                }
            })


            .addCase(getUserProductWishlist.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserProductWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.wishlist = action.payload;
                
            })
            .addCase(getUserProductWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                
            })

            .addCase(addProductToCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartProduct = action.payload;
                if(state.isSuccess){
                    toast.success("Product added to cart")
                }
                
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })


            .addCase(getUserCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartProducts = action.payload;
                
                
            })
            .addCase(getUserCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

            .addCase(deleteCartProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteCartProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCartProduct = action.payload;
                if(state.isSuccess){
                    toast.success("Remove product from cart")
                }
                
            })
            .addCase(deleteCartProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError){
                    toast.error("Something went wrong")
                }
            })


            .addCase(updateCartProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateCartProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCartProduct = action.payload;
                if(state.isSuccess){
                    toast.success("Updated product from cart")
                }
                
            })
            .addCase(updateCartProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError){
                    toast.error("Something went wrong")
                }
            })

            .addCase(createAnOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createAnOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.orderdProduct = action.payload;
                if(state.isSuccess){
                    toast.success("Successfully Orderd")
                }
            })
            .addCase(createAnOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError){
                    toast.error("Something went wrong")
                }
            })

            .addCase(getOrders.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getOrderdProducts = action.payload;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
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