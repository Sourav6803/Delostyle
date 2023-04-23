import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "./blogService";

export const getBlog = createAsyncThunk('blog/get-blogs', async (thunkAPI) => {
    try {
        return await blogService.getBlog();
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createBlog  = createAsyncThunk('blog/create-blogs', async (blogData, thunkAPI) => {
    try {
        return await blogService.createBlog(blogData);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const initialState = {
    blogs: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogs = action.payload
            })
            .addCase(getBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error
            })

            .addCase(createBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdBlog = action.payload
            })
            .addCase(createBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error
            })
    },
})

export default blogSlice.reducer;