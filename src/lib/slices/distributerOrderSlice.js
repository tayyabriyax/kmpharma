import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAPI } from '../fetchAPI';
import toast from 'react-hot-toast';

const initialState = {
    distributerOrders: [],
    orderDetails: [],
    order_id: 0,
    parties: [],
    paymentDetails: [],
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

export const getAllDistributerOrders = createAsyncThunk("distributerOrder/getAllDistributerOrders", async ({ party_id, from_date, to_date, paid_status }, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        const params = new URLSearchParams();

        if (party_id) params.append("party_id", party_id);
        if (from_date) params.append("from_date", from_date);
        if (to_date) params.append("to_date", to_date);
        if (paid_status) params.append("paid_status", paid_status);

        const query = params.toString();

        return await fetchAPI(
            `api/v1/orders/${query ? `?${query}` : ""}`,
            { method: "GET", token }
        );
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
}
);

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

export const getDropdownAdminParties = createAsyncThunk("distributerOrder/getDropdownAdminParties", async (_, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI(`api/v1/dropdowns/parties`, { method: "GET", token });
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

export const getOrderDetails = createAsyncThunk("distributerOrder/getOrderDetails", async (order_id, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI(`api/v1/orders/items-bill-by-order-id/${order_id}`, { method: "GET" });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const getOrdersByFilters = createAsyncThunk("distributerOrder/getOrdersByFilters", async ({ party_id, distributer_id, from_date, to_date, paid_status }, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        const params = new URLSearchParams();

        if (party_id) params.append("party_id", party_id);
        if (distributer_id) params.append("distributer_id", distributer_id);
        if (from_date) params.append("from_date", from_date);
        if (to_date) params.append("to_date", to_date);
        if (paid_status) params.append("paid_status", paid_status);

        const query = params.toString();

        return await fetchAPI(
            `api/v1/orders-get-all-orders-for-admin-user-with-detail${query ? `?${query}` : ""}`,
            { method: "GET", token }
        );
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
}
);

export const updateStatusAsPaid = createAsyncThunk("distributerOrder/updateStatusAsPaid", async (order_id, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI(`api/v1/orders/${order_id}/paid-status-update`, { method: "PATCH", data: { paid_status: "paid" } });
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
                state.order_id = action.payload.data.id;
                state.loadData = !state.loadData;
                state.loading = false;
            })
            .addCase(createDistributerOrder.rejected, (state, action) => {
                const errorMessage =
                    action.payload?.message ||
                    action.payload?.errors?.[0] ||
                    "Something went wrong";

                toast.error(errorMessage);
                state.loading = false;
            })
            .addCase(getDropdownParties.fulfilled, (state, action) => {
                state.parties = action.payload;
            })
            .addCase(getDropdownAdminParties.fulfilled, (state, action) => {
                state.parties = action.payload;
            })
            .addCase(getAllDistributerOrders.fulfilled, (state, action) => {
                state.distributerOrders = action.payload.data;
            })
            .addCase(getOrdersByFilters.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getOrdersByFilters.fulfilled, (state, action) => {
                state.distributerOrders = action.payload.data.orders;
                state.paymentDetails = action.payload.data;
                state.loading = false;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.orderDetails = action.payload.data;
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
                const errorMessage =
                    action.payload?.message ||
                    action.payload?.errors?.[0] ||
                    "Something went wrong";

                toast.error(errorMessage);
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
                const errorMessage =
                    action.payload?.message ||
                    action.payload?.errors?.[0] ||
                    "Something went wrong";

                toast.error(errorMessage);
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
                const errorMessage =
                    action.payload?.message ||
                    action.payload?.errors?.[0] ||
                    "Something went wrong";

                toast.error(errorMessage);
                state.loading = false;
            })
            .addCase(updateStatusAsPaid.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateStatusAsPaid.fulfilled, (state, action) => {
                toast.success("Status Updated");
                state.loadData = !state.loadData;
                state.loading = false;
            })
            .addCase(updateStatusAsPaid.rejected, (state, action) => {
                const errorMessage =
                    action.payload?.message ||
                    action.payload?.errors?.[0] ||
                    "Something went wrong";

                toast.error(errorMessage);
                state.loading = false;
            })
    }
});

export default distributerOrderSlice.reducer;