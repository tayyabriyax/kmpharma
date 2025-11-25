import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAPI } from '../fetchAPI';
import toast from 'react-hot-toast';

const initialState = {
    parties: [],
    distributers: [],
    loadData: false,
    loading: false
};

export const createParty = createAsyncThunk("party/createParty", async (credentials, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI("api/v1/parties/create", { method: "POST", data: credentials, token });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const getAllParties = createAsyncThunk("party/getAllParties", async (_, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI("api/v1/parties/", { method: "GET" });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const deletePartyById = createAsyncThunk("party/deletePartyById", async (id, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI(`api/v1/parties/${id}`, { method: "DELETE" });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const editPartyById = createAsyncThunk("party/editPartyById", async ({ id, credentials }, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI(`api/v1/parties/${id}`, { method: "PUT", data: credentials });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

export const getDropdownDistributers = createAsyncThunk("party/getDropdownDistributers", async (_, thunkAPI) => {
    const token = thunkAPI.getState().kmpharma?.auth?.accessToken;
    try {
        return await fetchAPI(`api/v1/dropdowns/distributers`, { method: "GET" });
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
})

const partySlice = createSlice({
    name: 'supplier',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createParty.pending, (state) => {
                state.loading = true;
            })
            .addCase(createParty.fulfilled, (state, action) => {
                toast.success("Party created Successfully !");
                state.loadData = !state.loadData;
                state.loading = false;
            })
            .addCase(createParty.rejected, (state, action) => {
                toast.error("Error while creating party !");
                state.loading = false;
            })
            .addCase(getDropdownDistributers.fulfilled, (state, action) => {
                state.distributers = action.payload;
            })
            .addCase(getAllParties.fulfilled, (state, action) => {
                state.parties = action.payload.data;
            })
            .addCase(deletePartyById.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletePartyById.fulfilled, (state, action) => {
                toast.success("Party deleted Successfully !");
                state.loadData = !state.loadData;
                state.loading = false;
            })
            .addCase(deletePartyById.rejected, (state, action) => {
                toast.error("Error while deleting party !");
                state.loading = false;
            })
            .addCase(editPartyById.pending, (state) => {
                state.loading = true;
            })
            .addCase(editPartyById.fulfilled, (state, action) => {
                toast.success("Party updated Successfully !");
                state.loadData = !state.loadData;
                state.loading = false;
            })
            .addCase(editPartyById.rejected, (state, action) => {
                toast.error("Error while updating party !");
                state.loading = false;
            })
    }
});

export default partySlice.reducer;