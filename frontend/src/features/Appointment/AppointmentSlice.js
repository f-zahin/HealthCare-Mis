import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addAppointment = createAsyncThunk(
  "appointment/add",
  async (formData, { rejectWithValue }) => {
    try {
      const { appointment } = await axios.post(
        "/api/appointment/createAppointment",
        formData,
      );
      return appointment;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "could not add appointment",
      );
    }
  },
);

export const getAppointments = createAsyncThunk(
  "appointment/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "/api/appointment/get-appointments",
      );
      return data.appointment;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "could not retrives all appointmens",
      );
    }
  },
);

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    appointment: [],
    success: false,
    loading: false,
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
      .addCase(addAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAppointment.fulfilled, (state, action) => {
        state.loading = false,
          state.success = true,
          state.appointment = action.payload
      })
      .addCase(addAppointment.rejected, (state, action) => {
        state.success = false,
          state.error = action.payload || "could not add appointment"
      });

    //
    builder
      .addCase(getAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.loading = false,
          state.success = true,
          state.appointment = action.payload
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.success = false,
          state.error = action.payload || "could not got all Appointments";
      });
  },
});

export const { removeErrors, removeSuccess } = appointmentSlice.actions;
export default appointmentSlice.reducer;
