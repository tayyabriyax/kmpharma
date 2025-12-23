import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAPI } from '../fetchAPI';
import toast from 'react-hot-toast';

const initialState = {
    suppliers: [],
    loadData: false,
    loading: false
};

export const createSupplier = createAsyncThunk("supplier/createSupplier", async (credentials, thunkAPI) => {
    try {
        return await fetchAPI("api/v1/suppliers/create", { method: "POST", data: credentials });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const getAllSuppliers = createAsyncThunk("supplier/getAllSuppliers", async (_, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI("api/v1/suppliers/", { method: "GET" });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const deleteSupplierById = createAsyncThunk("supplier/deleteSupplierById", async (id, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI(`api/v1/suppliers/${id}`, { method: "DELETE" });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const editSupplierById = createAsyncThunk("supplier/editSupplierById", async ({ id, credentials }, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI(`api/v1/suppliers/${id}`, { method: "PUT", data: credentials });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

const supplierSlice = createSlice({
    name: 'supplier',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createSupplier.pending, (state) => {
                state.loading = true;
            })
            .addCase(createSupplier.fulfilled, (state, action) => {
                toast.success("Supplier created Successfully");
                state.loadData = !state.loadData;
                state.loading = false;
            })
            .addCase(createSupplier.rejected, (state, action) => {
                const errorMessage =
                    action.payload?.message ||
                    action.payload?.errors?.[0] ||
                    "Something went wrong";

                toast.error(errorMessage);
                state.loading = false;
            })
            .addCase(getAllSuppliers.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllSuppliers.fulfilled, (state, action) => {
                state.suppliers = action.payload.data;
                state.loading = false;
            })
            .addCase(deleteSupplierById.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteSupplierById.fulfilled, (state, action) => {
                toast.success("Supplier deleted Successfully");
                state.loadData = !state.loadData;
                state.loading = false;
            })
            .addCase(deleteSupplierById.rejected, (state, action) => {
                const errorMessage =
                    action.payload?.message ||
                    action.payload?.errors?.[0] ||
                    "Something went wrong";

                toast.error(errorMessage);
                state.loading = false;
            })
            .addCase(editSupplierById.pending, (state) => {
                state.loading = true;
            })
            .addCase(editSupplierById.fulfilled, (state, action) => {
                toast.success("Supplier updated Successfully");
                state.loadData = !state.loadData;
                state.loading = false;
            })
            .addCase(editSupplierById.rejected, (state, action) => {
                const errorMessage =
                    action.payload?.message ||
                    action.payload?.errors?.[0] ||
                    "Something went wrong";

                toast.error(errorMessage);
                state.loading = false;
            })
    }
});

export default supplierSlice.reducer;