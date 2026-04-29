import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//register Doctor

export const register = createAsyncThunk(
  "doctor/register",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/doctor/register", formData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.responae?.data.message || " could not registerd",
      );
    }
  },
);

//get all doctors

export const getDoctors = createAsyncThunk(
  "doctor/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/doctor/get-doctors");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Could not retrieve doctors",
      );
    }
  },
);

export const deleteDoctor = createAsyncThunk(
  "doctor/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/doctor/delete-doctor/${id}`);
      console.log("from delete:  ", data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Could not retrieve doctors",
      );
    }
  },
);


// getDoctor
export const getSingelDoctor = createAsyncThunk(
  "doctor/getSingleDoctor",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/doctor/get-doctor/${id}`);
      return data.doctor; // ✅ return only doctor
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "could not retrieve doctor",
      );
    }
  },
);


// update Doctor


export const updateDoctor = createAsyncThunk(
  "doctor/updateDoctor",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `/api/doctor/update-doctor/${id}`,
        formData
      );
      return data; // backend response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Could not update doctor"
      );
    }
  }
);

export const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    doctors: [],
    loading: false,
    doctor: null,
    error: null,
    isAuthenticated: false,
    success: false,
    message: null,
    isDeleted: false,
    isUpdate: false,
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
    // register doctor

    builder
      .addCase(register.pending, (state) => {
        ((state.loading = true));
      })
      .addCase(register.fulfilled, (state, action) => {
        ((state.loading = false), (state.error = false));
        ((state.success = action.payload?.success),
          (state.doctors = action.payload?.doctor || null));
      })
      .addCase(register.rejected, (state, action) => {
        ((state.error = action.payload?.message || "could not registered"),
          (state.doctors = null));
      });

    // get All doctors
    builder
      .addCase(getDoctors.pending, (state) => {
        state.loading = true;
      })

      .addCase(getDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload?.doctors; // ✅ if payload is already array
      })

      .addCase(getDoctors.rejected, (state, action) => {
        state.error = action.payload;
      });

    // delete Doctor
    builder
      .addCase(deleteDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        ((state.loading = false),
          (action.doctors = action.payload.doctors || null),
          (state.success = true),
          (state.isDeleted = true));
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        ((state.doctors = null),
          (state.isDeleted = false),
          (state.success = false),
          (state.error =
            action.payload?.error.message || "Could not delete record"));
      });

    // getSingle Doctor
    builder
      .addCase(getSingelDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingelDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.success=true;
        state.doctor = action.payload;
      })
      .addCase(getSingelDoctor.rejected, (state, action) => {
        state.loading = false;
        state.doctor = null;
        state.success=false;
        state.error = action.payload || "could not deliver single doctor";
      });

      // update Doctor
      builder
      .addCase(updateDoctor.pending,(state)=>{
        state.loading=true
      })
      .addCase(updateDoctor.fulfilled,(state,action)=>{
        state.loading=false,
        state.success=true,
        state.doctor=action.payload.doctor
      })
      .addCase(updateDoctor.rejected,(state,action)=>{
        state.success=false,
        state.error=action.payload || 'could not update'
      })
     
  },
});

export const { removeErrors, removeSuccess } = doctorSlice.actions;
export default doctorSlice.reducer;
