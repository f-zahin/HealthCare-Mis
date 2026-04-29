import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addPerscription = createAsyncThunk(
  'perscription/add',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/perscription/add/${id}`,
        formData
      );

      return response.data.data; // ✅ correct
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'could not add perscription'
      );
    }
  }
);

export const PerscriptionSlice = createSlice({
  name: "perscription",
  initialState: {
    perscription: [],
    loading: false,
    success: false,
    error: false,
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addPerscription.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPerscription.fulfilled, (state, action) => {
        state.loading = false;
        state.perscription = action.payload;
        state.success = true;
      })
      .addCase(addPerscription.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload || "could not add perscription";
      });
  },
});

export const { removeErrors, removeSuccess } = PerscriptionSlice.actions;
export default PerscriptionSlice.reducer;
