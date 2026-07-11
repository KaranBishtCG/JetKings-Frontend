import axiosInstance from "../../config/axiosInstance";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAllBuyers = createAsyncThunk(
    'buyers/getAllBuyers',
    async ({ page = 1, pageSize = 10 } = {}, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('Buyers', { params: { page, pageSize } });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const createBuyer = createAsyncThunk(
    'buyers/createBuyer',
    async (buyerData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('Buyers', buyerData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const updateBuyer = createAsyncThunk(
    'buyers/updateBuyer',
    async ({ id, ...buyerData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`Buyers/${id}`, buyerData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const getBuyerById = createAsyncThunk(
    'buyers/getBuyerById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`Buyers/${id}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const deleteBuyer = createAsyncThunk(
    'buyers/deleteBuyer',
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`Buyers/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

const buyerSlice = createSlice({
    name: 'buyers',
    initialState: {
        items: [],
        totalCount: 0,
        page: 1,
        pageSize: 10,
        totalPages: 1,
        loading: false,
        error: null,
        creating: false,
        createError: null,
        createSuccess: false,
        selectedBuyer: null,
        loadingBuyer: false,
        viewError: null,
        updating: false,
        updateError: null,
        updateSuccess: false,
        deleting: false,
        deleteError: null,
    },
    reducers: {
        resetCreateStatus(state) {
            state.creating = false;
            state.createError = null;
            state.createSuccess = false;
        },
        clearSelectedBuyer(state) {
            state.selectedBuyer = null;
            state.loadingBuyer = false;
            state.viewError = null;
        },
        resetUpdateStatus(state) {
            state.updating = false;
            state.updateError = null;
            state.updateSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBuyers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllBuyers.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                state.totalCount = action.payload.totalCount;
                state.page = action.payload.page;
                state.pageSize = action.payload.pageSize;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(getAllBuyers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createBuyer.pending, (state) => {
                state.creating = true;
                state.createError = null;
                state.createSuccess = false;
            })
            .addCase(createBuyer.fulfilled, (state, action) => {
                state.creating = false;
                state.createSuccess = true;
                if (action.payload) {
                    state.items = [action.payload, ...state.items];
                }
            })
            .addCase(createBuyer.rejected, (state, action) => {
                state.creating = false;
                state.createError = action.payload;
            })
            .addCase(getBuyerById.pending, (state) => {
                state.loadingBuyer = true;
                state.viewError = null;
                state.selectedBuyer = null;
            })
            .addCase(getBuyerById.fulfilled, (state, action) => {
                state.loadingBuyer = false;
                state.selectedBuyer = action.payload;
            })
            .addCase(getBuyerById.rejected, (state, action) => {
                state.loadingBuyer = false;
                state.viewError = action.payload;
            })
            .addCase(updateBuyer.pending, (state) => {
                state.updating = true;
                state.updateError = null;
                state.updateSuccess = false;
            })
            .addCase(updateBuyer.fulfilled, (state, action) => {
                state.updating = false;
                state.updateSuccess = true;
                if (action.payload) {
                    state.items = state.items.map((item) =>
                        item.id === action.payload.id ? action.payload : item
                    );
                }
            })
            .addCase(updateBuyer.rejected, (state, action) => {
                state.updating = false;
                state.updateError = action.payload;
            })
            .addCase(deleteBuyer.pending, (state) => {
                state.deleting = true;
                state.deleteError = null;
            })
            .addCase(deleteBuyer.fulfilled, (state, action) => {
                state.deleting = false;
                state.items = state.items.filter((item) => item.id !== action.payload);
                state.totalCount = Math.max(0, state.totalCount - 1);
            })
            .addCase(deleteBuyer.rejected, (state, action) => {
                state.deleting = false;
                state.deleteError = action.payload;
            });
    },
});

export const { resetCreateStatus, clearSelectedBuyer, resetUpdateStatus } = buyerSlice.actions;
export default buyerSlice.reducer;