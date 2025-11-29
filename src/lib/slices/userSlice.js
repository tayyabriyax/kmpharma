import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAPI } from '../fetchAPI';
import toast from 'react-hot-toast';

const initialState = {
    users: [],
    userDetails: {},
    loadData: false,
    loading: false
};

export const createUser = createAsyncThunk("user/createUser", async (credentials, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI("api/v1/user/create", { method: "POST", data: credentials, token });
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

export const editUser = createAsyncThunk("user/editUser", async (credentials, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI(`api/v1/user/update-user-details`, { method: "PUT", data: credentials, token });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const getUserDetails = createAsyncThunk("user/getUserDetails", async (_, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI(`api/v1/user/get-user-details`, { method: "GET", token });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const changePassword = createAsyncThunk("user/changePassword", async (credentials, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI(`api/v1/user/change-password`, { method: "PUT", data: credentials, token });
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
                const errorMessage =
                    action.payload?.message ||
                    action.payload?.errors?.[0] ||
                    "Something went wrong";

                toast.error(errorMessage);
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
                const errorMessage =
                    action.payload?.message ||
                    action.payload?.errors?.[0] ||
                    "Something went wrong";

                toast.error(errorMessage);
                state.loading = false;
            })
            .addCase(editUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                toast.success("User updated Successfully");
                state.loadData = !state.loadData;
                state.loading = false;
            })
            .addCase(editUser.rejected, (state, action) => {
                const errorMessage =
                    action.payload?.message ||
                    action.payload?.errors?.[0] ||
                    "Something went wrong";

                toast.error(errorMessage);
                state.loading = false;
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.userDetails = action.payload.data;
            })
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                toast.success("Password changed Successfully");
                state.loading = false;
            })
            .addCase(changePassword.rejected, (state, action) => {
                const errorMessage =
                    action.payload?.message ||
                    action.payload?.errors?.[0] ||
                    "Something went wrong";

                toast.error(errorMessage);
                state.loading = false;
            })
    }
});

export default userSlice.reducer;