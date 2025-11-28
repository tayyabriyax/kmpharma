import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAPI } from '../fetchAPI';
import toast from 'react-hot-toast';

const initialState = {
    distributerProducts: [],
    products: [],
    loadData: false,
    loading: false
};

export const createDistributerProduct = createAsyncThunk("distributerProduct/createDistributerProduct", async (credentials, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI("api/v1/distributer_products/create", { method: "POST", data: credentials, token });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const getAllDistributerProducts = createAsyncThunk("distributerProduct/getAllDistributerProducts", async (_, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI("api/v1/distributer_products/", { method: "GET", token });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const deleteDistributerProductById = createAsyncThunk("distributerProduct/deleteDistributerProductById", async (id, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI(`api/v1/distributer_products/${id}`, { method: "DELETE", token });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const editDistributerProductById = createAsyncThunk("distributerProduct/editDistributerProductById", async ({ id, credentials }, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI(`api/v1/distributer_products/${id}`, { method: "PUT", data: credentials, token });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const getDropdownProducts = createAsyncThunk("distributerProduct/getDropdownProducts", async (_, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI(`api/v1/dropdowns/veternary-products`, { method: "GET" });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

const distributerProductSlice = createSlice({
    name: 'distributerProduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createDistributerProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(createDistributerProduct.fulfilled, (state, action) => {
                toast.success("Distributer Product created Successfully !");
                state.loadData = !state.loadData;
                state.loading = false;
            })
            .addCase(createDistributerProduct.rejected, (state, action) => {
                toast.error("Error while creating Distributer Product !");
                state.loading = false;
            })
            .addCase(getDropdownProducts.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(getAllDistributerProducts.fulfilled, (state, action) => {
                state.distributerProducts = action.payload.data;
            })
            .addCase(deleteDistributerProductById.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteDistributerProductById.fulfilled, (state, action) => {
                toast.success("Distributer product deleted Successfully !");
                state.loadData = !state.loadData;
                state.loading = false;
            })
            .addCase(deleteDistributerProductById.rejected, (state, action) => {
                toast.error("Error while Distributer product !");
                state.loading = false;
            })
            .addCase(editDistributerProductById.pending, (state) => {
                state.loading = true;
            })
            .addCase(editDistributerProductById.fulfilled, (state, action) => {
                toast.success("Distributer product updated Successfully !");
                state.loadData = !state.loadData;
                state.loading = false;
            })
            .addCase(editDistributerProductById.rejected, (state, action) => {
                toast.error("Error while updating Distributer product !");
                state.loading = false;
            })
    }
});

export default distributerProductSlice.reducer;