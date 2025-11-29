import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAPI } from '../fetchAPI';
import toast from 'react-hot-toast';

const initialState = {
    loggedInUser: null,
    accessToken: null,
    isLoggedIn: false,
    loading: false
};

export const loginAsync = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
    try {
        return await fetchAPI("api/v1/user/login/", { method: "POST", data: credentials });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        REMOVE_ACTIVE_USER: (state, action) => {
            state.isLoggedIn = false;
            state.loggedInUser = null;
            state.accessToken = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.loggedInUser = action.payload.data.user;
                state.accessToken = action.payload.data.access_token;
                state.loading = false;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                const errorMessage =
                    action.payload?.message ||
                    action.payload?.errors?.[0] ||
                    "Something went wrong";

                toast.error(errorMessage);
                state.loading = false;
            })
    }
});

export default authSlice.reducer;
export const { REMOVE_ACTIVE_USER } = authSlice.actions;
