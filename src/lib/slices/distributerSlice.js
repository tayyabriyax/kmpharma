import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAPI } from '../fetchAPI';
import toast from 'react-hot-toast';

const initialState = {
    distributers: [],
    loadData: false,
    loading: false
};

export const createDistributer = createAsyncThunk("distributer/createDistributer", async (credentials, thunkAPI) => {
    try {
        return await fetchAPI("api/v1/distributers/create", { method: "POST", data: credentials });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const getAllDistributers = createAsyncThunk("distributer/getAllDistributers", async (_, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI("api/v1/distributers/", { method: "GET" });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const deleteDistributerById = createAsyncThunk("distributer/deleteDistributerById", async (id, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI(`api/v1/distributers/${id}`, { method: "DELETE" });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

const distributerSlice = createSlice({
    name: 'distributer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createDistributer.pending, (state) => {
                state.loading = true;
            })
            .addCase(createDistributer.fulfilled, (state, action) => {
                toast.success("Distributer created Successfully !");
                state.loadData = !state.loadData;
                state.loading = false;
            })
            .addCase(createDistributer.rejected, (state, action) => {
                toast.error("Error while creating distributer !");
                state.loading = false;
            })
            .addCase(getAllDistributers.fulfilled, (state, action) => {
                state.distributers = action.payload.data;
            })
            .addCase(deleteDistributerById.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteDistributerById.fulfilled, (state, action) => {
                toast.success("Distributer deleted Successfully !");
                state.loadData = !state.loadData;
                state.loading = false;
            })
            .addCase(deleteDistributerById.rejected, (state, action) => {
                toast.error("Error while deleting distributer !");
                state.loading = false;
            })
    }
});

export default distributerSlice.reducer;