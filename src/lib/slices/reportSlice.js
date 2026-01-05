import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
    loading: false
};

export const generateReport = createAsyncThunk(
    "reports/generateReport",
    async ({ party_id, date, distributer_id, download }, thunkAPI) => {
        const token = thunkAPI.getState().kmpharma?.auth?.accessToken;

        try {
            const params = new URLSearchParams();

            if (party_id) params.append("party_id", party_id);
            if (distributer_id) params.append("distributer_id", distributer_id);
            if (date) params.append("date", date);
            if (download) params.append("download", download);

            const query = params.toString();
            const url = `api/v1/reports/orders-for-company-admin${query ? `?${query}` : ""}`;

            // IMPORTANT CHANGE → fetch the PDF as a blob
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to generate report");
            }

            const blob = await response.blob();
            return blob; // return PDF blob
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
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