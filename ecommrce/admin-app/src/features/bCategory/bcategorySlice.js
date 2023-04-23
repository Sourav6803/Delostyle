import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bCategoryService from "./bcategoryService";


export const getCategories = createAsyncThunk('blogCategory/get-categories', async (thunkAPI) => {
    try {
        return await bCategoryService.getCategories();
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createBlogCategory  = createAsyncThunk('blogCategory/create-categories', async (catData, thunkAPI) => {
    try {
        return await bCategoryService.createBlogCategory(catData);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


const initialState = {
    bCategories: [],
    isError: false,
    isLoading: false,
    isSucces: false,
    message: ""
}

export const pCategorySlice = createSlice({
    name: "pCategories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSucces = true;
                state.bCategories = action.payload
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSucces = false;
                state.message = action.error
            })

            .addCase(createBlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBlogCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSucces = true;
                state.createdBlogCategory = action.payload
            })
            .addCase(createBlogCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSucces = false;
                state.message = action.error
            })
    },
})

export default pCategorySlice.reducer;