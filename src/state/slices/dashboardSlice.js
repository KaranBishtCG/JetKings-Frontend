import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  "http://ec2-13-222-99-70.compute-1.amazonaws.com:5000/api/Dashboard";

// Summary API
export const fetchDashboardSummary = createAsyncThunk(
  "dashboard/fetchSummary",
  async () => {
    const response = await axios.get(`${BASE_URL}/summary`);
    return response.data.data;
  }
);

// Recent Activities API
export const fetchRecentActivities = createAsyncThunk(
  "dashboard/fetchRecentActivities",
  async () => {
    const response = await axios.get(
      `${BASE_URL}/recent-activities`
    );
    return response.data.data;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState: {
    summary: null,
    activities: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Summary
      .addCase(fetchDashboardSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(fetchDashboardSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Activities
      .addCase(fetchRecentActivities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecentActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.activities = action.payload;
      })
      .addCase(fetchRecentActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dashboardSlice.reducer;