import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadservice from "./uploadService";


export const uploadImg = createAsyncThunk('upload/images', async (data, thunkAPI) => {
    try {
        const fromData = new FormData();
        for (let i = 0; i < data.length; i++) {
            fromData.append("images", data[i])
        }
        return await uploadservice.uploadImg(fromData);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const delImg = createAsyncThunk('delete/images', async (id, thunkAPI) => {
    try { 
        return await uploadservice.deleteImg(id);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const initialState = {
    images: [],
    isError: false,
    isLoading: false,
    isSucces: false,
    message: ""
}

export const uploadSlice = createSlice({
    name: "images",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadImg.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(uploadImg.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSucces = true;
                state.images = action.payload
            })
            .addCase(uploadImg.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSucces = false;
                state.message = action.error
            })
            .addCase(delImg.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(delImg.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSucces = true;
                state.images = [];
            })
            .addCase(delImg.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSucces = false;
                state.message = action.payload
            })
    },
})

export default uploadSlice.reducer;