import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";

// GET ALL
export const fetchBuyerProductPrices = createAsyncThunk(
  "buyerProductPrices/fetchBuyerProductPrices",
  async ({ page = 1, pageSize = 10 } = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("BuyerProductPrices", {
        params: { page, pageSize },
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// GET BY ID
export const fetchBuyerProductPriceById = createAsyncThunk(
  "buyerProductPrices/fetchBuyerProductPriceById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `BuyerProductPrices/${id}`
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// CREATE
export const createBuyerProductPrice = createAsyncThunk(
  "buyerProductPrices/createBuyerProductPrice",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "BuyerProductPrices",
        data
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// UPDATE
export const updateBuyerProductPrice = createAsyncThunk(
  "buyerProductPrices/updateBuyerProductPrice",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      await axiosInstance.put(
        `BuyerProductPrices/${id}`,
        data
      );

      return {
        id,
        ...data,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// DELETE
export const deleteBuyerProductPrice = createAsyncThunk(
  "buyerProductPrices/deleteBuyerProductPrice",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(
        `BuyerProductPrices/${id}`
      );

      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const buyerProductPriceSlice = createSlice({
  name: "buyerProductPrices",

  initialState: {
    buyerProductPrices: [],
    selectedBuyerProductPrice: null,

    loading: false,
    detailsLoading: false,
    error: null,

    totalCount: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  },

  reducers: {
    clearSelectedBuyerProductPrice: (state) => {
      state.selectedBuyerProductPrice = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // GET ALL
      .addCase(fetchBuyerProductPrices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyerProductPrices.fulfilled, (state, action) => {
        state.loading = false;

        state.buyerProductPrices = action.payload.items || [];
        state.totalCount = action.payload.totalCount;
        state.page = action.payload.page;
        state.pageSize = action.payload.pageSize;
        state.totalPages = action.payload.totalPages;
        state.hasPreviousPage = action.payload.hasPreviousPage;
        state.hasNextPage = action.payload.hasNextPage;
      })
      .addCase(fetchBuyerProductPrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET BY ID
      .addCase(fetchBuyerProductPriceById.pending, (state) => {
        state.detailsLoading = true;
      })
      .addCase(fetchBuyerProductPriceById.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.selectedBuyerProductPrice = action.payload;
      })
      .addCase(fetchBuyerProductPriceById.rejected, (state, action) => {
        state.detailsLoading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createBuyerProductPrice.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBuyerProductPrice.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload) {
          state.buyerProductPrices.unshift(action.payload);
        }
      })
      .addCase(createBuyerProductPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateBuyerProductPrice.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBuyerProductPrice.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.buyerProductPrices.findIndex(
          (item) => item.id === action.payload.id
        );

        if (index !== -1) {
          state.buyerProductPrices[index] = {
            ...state.buyerProductPrices[index],
            ...action.payload,
          };
        }
      })
      .addCase(updateBuyerProductPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteBuyerProductPrice.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBuyerProductPrice.fulfilled, (state, action) => {
        state.loading = false;

        state.buyerProductPrices =
          state.buyerProductPrices.filter(
            (item) => item.id !== action.payload
          );
      })
      .addCase(deleteBuyerProductPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearSelectedBuyerProductPrice,
} = buyerProductPriceSlice.actions;

export default buyerProductPriceSlice.reducer;