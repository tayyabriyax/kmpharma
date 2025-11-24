import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAPI } from '../fetchAPI';
import toast from 'react-hot-toast';

const initialState = {
    users: [],
    loadData: false,
    loading: false
};

export const createUser = createAsyncThunk("user/createUser", async (credentials, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI("api/v1/user/create", { method: "POST", data: credentials });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const getAllUsers = createAsyncThunk("user/getAllUsers", async (_, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI("api/v1/user/", { method: "GET" });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const deleteUserById = createAsyncThunk("user/deleteUserById", async (id, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI(`api/v1/user/delete-user/${id}`, { method: "DELETE" });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const editUserById = createAsyncThunk("user/editUserById", async ({ id, credentials }, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI(`api/v1/user/${id}`, { method: "PUT", data: credentials });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                toast.success("User created Successfully");
                state.loadData = !state.loadData;
                state.loading = false;
            })
            .addCase(createUser.rejected, (state, action) => {
                toast.error("Error while creating user");
                state.loading = false;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(deleteUserById.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUserById.fulfilled, (state, action) => {
                toast.success("User deleted Successfully");
                state.loadData = !state.loadData;
                state.loading = false;
            })
            .addCase(deleteUserById.rejected, (state, action) => {
                toast.error("Error while deleting user");
                state.loading = false;
            })
            .addCase(editUserById.pending, (state) => {
                state.loading = true;
            })
            .addCase(editUserById.fulfilled, (state, action) => {
                toast.success("User updated Successfully");
                state.loadData = !state.loadData;
                state.loading = false;
            })
            .addCase(editUserById.rejected, (state, action) => {
                toast.error("Error while updating user");
                state.loading = false;
            })
    }
});

export default userSlice.reducer;