import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosInstance';

export const fetchBillBuyers = createAsyncThunk(
    'generateBill/fetchBillBuyers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('GenerateBill/buyers');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const fetchCategories = createAsyncThunk(
    'generateBill/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('GenerateBill/categories');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const fetchProducts = createAsyncThunk(
    'generateBill/fetchProducts',
    async ({ buyerId, categoryId } = {}, { rejectWithValue }) => {
        try {
            let response;
            if (buyerId) {
                const params = { buyerId };
                if (categoryId) params.categoryId = categoryId;
                response = await axiosInstance.get('GenerateBill/products', { params });
            } else {
                response = await axiosInstance.get('Products', { params: { page: 1, pageSize: 10 } });
            }
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

const generateBillSlice = createSlice({
    name: 'generateBill',
    initialState: {
        buyers: [],
        buyersLoading: false,
        buyersError: null,
        categories: [],
        categoriesLoading: false,
        products: [],
        productsLoading: false,
        productsError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBillBuyers.pending, (state) => {
                state.buyersLoading = true;
                state.buyersError = null;
            })
            .addCase(fetchBillBuyers.fulfilled, (state, action) => {
                state.buyersLoading = false;
                state.buyers = Array.isArray(action.payload)
                    ? action.payload
                    : (action.payload?.items ?? []);
            })
            .addCase(fetchBillBuyers.rejected, (state, action) => {
                state.buyersLoading = false;
                state.buyersError = action.payload;
            })
            .addCase(fetchCategories.pending, (state) => {
                state.categoriesLoading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categoriesLoading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.categoriesLoading = false;
            })
            .addCase(fetchProducts.pending, (state) => {
                state.productsLoading = true;
                state.productsError = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.productsLoading = false;
                // /Products returns { items: [] }, /GenerateBill/products returns a plain array
                const raw = Array.isArray(action.payload)
                    ? action.payload
                    : (action.payload?.items ?? []);
                // Normalize both shapes to a consistent structure for ProductCard
                state.products = raw.map((p) => ({
                    ...p,
                    effectivePrice: p.effectivePrice ?? p.defaultPrice ?? 0,
                    categoryName: p.categoryName
                        ?? state.categories.find((c) => c.id === p.categoryId)?.name
                        ?? '',
                    hasSpecialPrice: p.hasSpecialPrice ?? false,
                }));
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.productsLoading = false;
                state.productsError = action.payload;
            });
    },
});

export default generateBillSlice.reducer;
