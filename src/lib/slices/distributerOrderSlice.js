import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAPI } from '../fetchAPI';
import toast from 'react-hot-toast';

const initialState = {
    distributerOrders: [],
    order_id: 0,
    parties: [],
    loadData: false,
    loading: false
};

export const createDistributerOrder = createAsyncThunk("distributerOrder/createDistributerOrder", async (credentials, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI("api/v1/orders/", { method: "POST", data: credentials, token });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const getAllDistributerOrders = createAsyncThunk("distributerOrder/getAllDistributerOrders", async (_, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI("api/v1/orders/", { method: "GET", token });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const deleteDistributerOrderById = createAsyncThunk("distributerOrder/deleteDistributerOrderById", async (id, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI(`api/v1/orders/${id}`, { method: "DELETE" });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const editDistributerOrderById = createAsyncThunk("distributerOrder/editDistributerOrderById", async ({ id, credentials }, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI(`api/v1/orders/${id}`, { method: "PUT", data: credentials });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const getDropdownParties = createAsyncThunk("distributerOrder/getDropdownParties", async (_, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI(`api/v1/dropdowns/parties-by-distributer`, { method: "GET", token });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const createBill = createAsyncThunk("distributerOrder/createBill", async ({ order_id, formData }, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI(`api/v1/orders/${order_id}/items-make-bill`, { method: "POST", data: formData });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

const distributerOrderSlice = createSlice({
    name: 'distributerOrder',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createDistributerOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(createDistributerOrder.fulfilled, (state, action) => {
                toast.success("Order created Successfully");
                state.order_id = action.payload.data.id;
                state.loadData = !state.loadData;
                state.loading = false;
            })
            .addCase(createDistributerOrder.rejected, (state, action) => {
                toast.error("Error while creating Order");
                state.loading = false;
            })
            .addCase(getDropdownParties.fulfilled, (state, action) => {
                state.parties = action.payload;
            })
            .addCase(getAllDistributerOrders.fulfilled, (state, action) => {
                state.distributerOrders = action.payload.data;
            })
            .addCase(deleteDistributerOrderById.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteDistributerOrderById.fulfilled, (state, action) => {
                toast.success("Order deleted Successfully");
                state.loadData = !state.loadData;
                state.loading = false;
            })
            .addCase(deleteDistributerOrderById.rejected, (state, action) => {
                toast.error("Error while deleting Order");
                state.loading = false;
            })
            .addCase(editDistributerOrderById.pending, (state) => {
                state.loading = true;
            })
            .addCase(editDistributerOrderById.fulfilled, (state, action) => {
                toast.success("Order updated Successfully");
                state.loadData = !state.loadData;
                state.loading = false;
            })
            .addCase(editDistributerOrderById.rejected, (state, action) => {
                toast.error("Error while updating Order");
                state.loading = false;
            })
            .addCase(createBill.pending, (state) => {
                state.loading = true;
            })
            .addCase(createBill.fulfilled, (state, action) => {
                toast.success("Bill created Successfully");
                state.loadData = !state.loadData;
                state.loading = false;
            })
            .addCase(createBill.rejected, (state, action) => {
                toast.error("Error while creating bill");
                state.loading = false;
            })
    }
});

export default distributerOrderSlice.reducer;