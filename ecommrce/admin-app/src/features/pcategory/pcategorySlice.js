import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { resetState } from "../brand/brandSlice";
import pCategoryService from "./pcategoryService";

export const getCategories = createAsyncThunk('productCategory/get-categories', async (thunkAPI) => {
    try {
        return await pCategoryService.getProductCategories();
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getAProductCategory = createAsyncThunk('productCategory/get-product-category', async (id,thunkAPI) => {
    try {
        return await pCategoryService.getProductCategory(id);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createCategory = createAsyncThunk('productCategory/create-category', async (id,thunkAPI) => {
    try {
        return await pCategoryService.createProductCategory(id);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const updateAProductCategory  = createAsyncThunk('productCategory/update-product-category', async (category, thunkAPI) => {
    try {
        return await pCategoryService.updateProductCategory(category);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteAProductCategory = createAsyncThunk('productCategory/delete-product-category', async (category, thunkAPI) => {
    try {
        return await pCategoryService.deleteProductCategory(category)
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

const initialState = {
    pCategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const pCategorySlice = createSlice({
    name: "pCategories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get categories //
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.pCategories = action.payload
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error
            })
             
            // create category

            .addCase(createCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdCategory = action.payload
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error
            })

            // update category

            .addCase(updateAProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAProductCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCategory = action.payload
            })
            .addCase(updateAProductCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error
            })

            // Deleted categories

            .addCase(deleteAProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAProductCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCategory = action.payload;
            })
            .addCase(deleteAProductCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })


            .addCase(getAProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAProductCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.categoryName = action.payload.title;
            })
            .addCase(getAProductCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, ()=>initialState)
    },
})

export default pCategorySlice.reducer;