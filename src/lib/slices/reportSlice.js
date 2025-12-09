import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAPI } from '../fetchAPI';
import toast from 'react-hot-toast';

const initialState = {
    loading: false
};

export const generateReport = createAsyncThunk("reports/generateReport", async ({ party_id, from_date, to_date, paid_status, distributer_id }, thunkAPI) => {
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
            `api/v1/reports/orders${query ? `?${query}` : ""}`,
            { method: "GET", token }
        );
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data || { message: err.message });
    }
}
);

const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(generateReport.pending, (state) => {
                state.loading = true;
            })
            .addCase(generateReport.fulfilled, (state, action) => {
                toast.success("Report generated Successfully");
                state.loading = false;
            })
            .addCase(generateReport.rejected, (state, action) => {
                const errorMessage =
                    action.payload?.message ||
                    action.payload?.errors?.[0] ||
                    "Something went wrong";

                toast.error(errorMessage);
                state.loading = false;
            })
    }
});

export default reportSlice.reducer;