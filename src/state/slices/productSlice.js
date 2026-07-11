import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";

// GET ALL PRODUCTS
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page = 1, pageSize = 10 } = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("Products", {
        params: { page, pageSize },
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// GET PRODUCT BY ID
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`Products/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// CREATE PRODUCT
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "Products",
        productData
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// UPDATE PRODUCT
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `Products/${id}`,
        productData
      );

      return response.data?.data ?? { id, ...productData };
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// DELETE PRODUCT
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`Products/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,

    loading: false,
    detailsLoading: false,

    error: null,

    totalCount: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },

  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH PRODUCTS
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.products = action.payload.items || [];
        state.totalCount = action.payload.totalCount;
        state.page = action.payload.page;
        state.pageSize = action.payload.pageSize;
        state.totalPages = action.payload.totalPages;
        state.hasNextPage = action.payload.hasNextPage;
        state.hasPreviousPage = action.payload.hasPreviousPage;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH PRODUCT BY ID
      .addCase(fetchProductById.pending, (state) => {
        state.detailsLoading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.detailsLoading = false;
        state.error = action.payload;
      })

      // CREATE PRODUCT
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload) {
          state.products.unshift(action.payload);
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE PRODUCT
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.products.findIndex(
          (item) => item.id === action.payload.id
        );

        if (index !== -1) {
          state.products[index] = {
            ...state.products[index],
            ...action.payload,
          };
        }

        if (
          state.selectedProduct &&
          state.selectedProduct.id === action.payload.id
        ) {
          state.selectedProduct = {
            ...state.selectedProduct,
            ...action.payload,
          };
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE PRODUCT
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;

        state.products = state.products.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export default productSlice.reducer;