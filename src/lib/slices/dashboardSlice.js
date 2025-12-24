import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAPI } from '../fetchAPI';

const initialState = {
    data: [],
    loadData: false,
    loading: false
};

export const getDashboardData = createAsyncThunk("dashboard/getDashboardData", async (_, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI("api/v1/dashboard/users-distributors-products-orders-admin", { method: "GET", token });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDashboardData.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getDashboardData.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
    }
});

export default dashboardSlice.reducer;