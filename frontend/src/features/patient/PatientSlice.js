import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPatients = createAsyncThunk(
  "patient/get",
  async (_, { rejeectWithValue }) => {
    try {
      const {data}  = await axios.get("/api/patient/get-patients");
     
      return data.patient;
    } catch (error) {
      return rejeectWithValue(
        error.response.data.message || "coul not retived patients",
      );
    }
  },
);

export const patientSlice = createSlice({
  name: "patient",
  initialState: {
    patient: [],
    success: false,
    error: false,
    loading: false,
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
      .addCase(getPatients.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.patient = action.payload;
      })
      .addCase(getPatients.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload || "could not retrived ";
      });
  },
});

export const { removeErrors, removeSuccess } = patientSlice.actions;
export default patientSlice.reducer;
