import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAPI } from '../fetchAPI';
import toast from 'react-hot-toast';

const initialState = {
    ledgerDetails: [],
    loadData: false,
    loading: false
};

export const createLedger = createAsyncThunk("ledger/createLedger", async (credentials, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI("api/v1/ledger/create", { method: "POST", data: credentials, token });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const getLedgerDetails = createAsyncThunk("ledger/getLedgerDetails", async (id, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        const params = new URLSearchParams();

        if (id) params.append("distributer_id", id);

        const query = params.toString();

        return await fetchAPI(
            `api/v1/ledger/get-ledger-details${query ? `?${query}` : ""}`,
            { method: "GET", token }
        );
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const deleteLedgerById = createAsyncThunk("ledger/deleteLedgerById", async (id, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI(`api/v1/ledger-delete/${id}`, { method: "DELETE" });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

const ledgerSlice = createSlice({
    name: 'ledger',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createLedger.pending, (state) => {
                state.loading = true;
            })
            .addCase(createLedger.fulfilled, (state, action) => {
                toast.success("Ledger created Successfully");
                state.loadData = !state.loadData;
                state.loading = false;
            })
            .addCase(createLedger.rejected, (state, action) => {
                const errorMessage =
                    action.payload?.message ||
                    action.payload?.errors?.[0] ||
                    "Something went wrong";

                toast.error(errorMessage);
                state.loading = false;
            })
            .addCase(getLedgerDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getLedgerDetails.fulfilled, (state, action) => {
                state.ledgerDetails = action.payload.data;
                state.loading = false;
            })
            .addCase(deleteLedgerById.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteLedgerById.fulfilled, (state, action) => {
                toast.success("Ledger deleted Successfully");
                state.loadData = !state.loadData;
                state.loading = false;
            })
            .addCase(deleteLedgerById.rejected, (state, action) => {
                const errorMessage =
                    action.payload?.message ||
                    action.payload?.errors?.[0] ||
                    "Something went wrong";

                toast.error(errorMessage);
                state.loading = false;
            })
    }
});

export default ledgerSlice.reducer;