import { createSlice, createAsyncThunk , createAction } from "@reduxjs/toolkit";
import couponService from "./couponService";

export const getAllCoupons = createAsyncThunk('coupon/get-coupons', async (thunkAPI) => {
    try {
        return await couponService.getCoupons();
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getACoupon = createAsyncThunk('coupon/get-coupon', async (couponId ,thunkAPI) => {
    try {
        return await couponService.getCoupon(couponId);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createCoupon  = createAsyncThunk('coupon/create-coupon', async (couponData, thunkAPI) => {
    try {
        return await couponService.createCoupon(couponData);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateACupon  = createAsyncThunk('coupon/update-coupon', async (couponData, thunkAPI) => {
    try {
        return await couponService.updateCoupon(couponData);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteACoupon  = createAsyncThunk('coupon/delete-coupon', async (coupon, thunkAPI) => {
    try {
        return await couponService.deleteCoupon(coupon)
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const resetState = createAction("Reset_all")

const initialState = {
    coupons: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}




export const couponSlice = createSlice({
    name: "coupons",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCoupons.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCoupons.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.coupons = action.payload
            })
            .addCase(getAllCoupons.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error
            })
            .addCase(createCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdCoupon = action.payload
            })
            .addCase(createCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error
            })

            .addCase(getACoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getACoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.couponName= action.payload.name
                state.couponDiscount= action.payload.discount
                state.couponExpiry= action.payload.expiry
            })
            .addCase(getACoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error
            })

            .addCase(updateACupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateACupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCoupon = action.payload
                // state.updatedCoupon=action.payload
            })
            .addCase(updateACupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error
            })

            .addCase(deleteACoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteACoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCoupon = action.payload;
            })
            .addCase(deleteACoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error
            })
            .addCase(resetState, ()=>initialState)
    },
})

export default couponSlice.reducer;