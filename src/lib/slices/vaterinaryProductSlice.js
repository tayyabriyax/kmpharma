import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAPI } from '../fetchAPI';
import toast from 'react-hot-toast';

const initialState = {
    vaterinaryProducts: [],
    suppliers: [],
    productDetails: {},
    loadData: false,
    loading: false
};

export const createVaterinaryProduct = createAsyncThunk("vaterinaryProduct/createVaterinaryProduct", async (credentials, thunkAPI) => {
    try {
        return await fetchAPI("api/v1/veterinary-products/", { method: "POST", data: credentials });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const getAllVaterinaryProducts = createAsyncThunk("vaterinaryProduct/getAllVaternaryProducts", async (_, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI("api/v1/veterinary-products/", { method: "GET" });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const getVaterinaryProductsById = createAsyncThunk("vaterinaryProduct/getVaterinaryProductsById", async (id, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI(`api/v1/veterinary-products/${id}`, { method: "GET" });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const deleteVaterinaryProductById = createAsyncThunk("vaterinaryProduct/deleteVaterinaryProductById", async (id, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI(`api/v1/veterinary-products/${id}`, { method: "DELETE" });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const editVeterinaryProductById = createAsyncThunk("vaterinaryProduct/editVeterinaryProductById", async ({ id, credentials }, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI(`api/v1/veterinary-products/${id}`, { method: "PUT", data: credentials });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const getDropdownSuppliers = createAsyncThunk("vaterinaryProduct/getDropdownSuppliers", async (_, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI(`api/v1/dropdowns/suppliers`, { method: "GET" });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

const vaterinaryProductSlice = createSlice({
    name: 'vaterinaryProduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createVaterinaryProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(createVaterinaryProduct.fulfilled, (state, action) => {
                toast.success("Product created Successfully");
                state.loadData = !state.loadData;
                state.loading = false;
            })
            .addCase(createVaterinaryProduct.rejected, (state, action) => {
                const errorMessage =
                    action.payload?.message ||
                    action.payload?.errors?.[0] ||
                    "Something went wrong";

                toast.error(errorMessage);
                state.loading = false;
            })
            .addCase(getDropdownSuppliers.fulfilled, (state, action) => {
                state.suppliers = action.payload;
            })
            .addCase(getAllVaterinaryProducts.fulfilled, (state, action) => {
                state.vaterinaryProducts = action.payload.data;
            })
            .addCase(getVaterinaryProductsById.fulfilled, (state, action) => {
                state.productDetails = action.payload.data;
            })
            .addCase(deleteVaterinaryProductById.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteVaterinaryProductById.fulfilled, (state, action) => {
                toast.success("Veterinary product deleted Successfully");
                state.loadData = !state.loadData;
                state.loading = false;
            })
            .addCase(deleteVaterinaryProductById.rejected, (state, action) => {
                const errorMessage =
                    action.payload?.message ||
                    action.payload?.errors?.[0] ||
                    "Something went wrong";

                toast.error(errorMessage);
                state.loading = false;
            })
            .addCase(editVeterinaryProductById.pending, (state) => {
                state.loading = true;
            })
            .addCase(editVeterinaryProductById.fulfilled, (state, action) => {
                toast.success("Veterinary product updated Successfully");
                state.loadData = !state.loadData;
                state.loading = false;
            })
            .addCase(editVeterinaryProductById.rejected, (state, action) => {
                const errorMessage =
                    action.payload?.message ||
                    action.payload?.errors?.[0] ||
                    "Something went wrong";

                toast.error(errorMessage);
                state.loading = false;
            })
    }
});

export default vaterinaryProductSlice.reducer;