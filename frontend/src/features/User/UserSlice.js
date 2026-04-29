import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config,
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed please try again",
      );
    }
  },
);

// logout
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/user/logout", {
        withCredentials: true,
      });

      return data; // ✅ clean
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  },
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (userdata, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/user/register", userdata);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          " failed to register User please try again",
      );
    }
  },
);

// get All User

export const getAllUSer = createAsyncThunk(
  "user/get",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/user/get-user");
      return data.users;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.message || "could not retived the Users",
      );
    }
  },
);

// delete User

export const deletUser = createAsyncThunk(
  "user/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/user/delete-user/${id}`);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "could not delte");
    }
  },
);

// updateUser

export const updateUser = createAsyncThunk(
  "user/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const data = await axios.put(`/api/user/update-user/${id}`, formData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "could not update ",
      );
    }
  },
);

// get Single User
export const getSingleUser = createAsyncThunk(
  "user/getSingle",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/user/get-user/${id}`);
      return data.user; // 👈 important
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "could not get single user",
      );
    }
  },
);

// Change Password

export const updatePassword = createAsyncThunk(
  "user/changePassword",
  async(formData,{rejectWithValue}) => {
    try{

      const data = await axios.put('/api/user/update-password',formData);
      return data.user;

    }catch(error){
      return rejectWithValue(
        error.response.data.message || 'could not update the password'
      )
    }
  },
);

const UserSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false,
    isAuthenticated: false,
    message: null,
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    /// login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
        state.user = action.payload?.user || null;
        state.isAuthenticated = Boolean(action.payload?.user);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Login Failed. Please try again";
        state.user = null;
      });
    // logout

    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false; // ✅ FIXED
        state.error = action.payload || "Could not Logout";
      });

    // register User
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        ((state.loading = false),
          (state.success = true),
          (state.user = action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        ((state.success = false),
          (state.error =
            action.payload?.message || "Could not Registerd User"));
      });

    // retive All Users:
    builder
      .addCase(getAllUSer.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUSer.fulfilled, (state, action) => {
        ((state.loading = false),
          (state.success = true),
          (state.user = action.payload));
      })
      .addCase(getAllUSer.rejected, (state, action) => {
        ((state.success = false),
          (state.error = action.payload || " could not retived all users"));
      });

    // delete User

    builder
      .addCase(deletUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(deletUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "could not delete the user";
      });

    // update User
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload || "could not updte the User";
      });

    // getSingle User
    builder
      .addCase(getSingleUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload || "could not retrived single User";
      });


      // Update Passwrod
    builder
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload || "could not change password User";
      });

  },
});

export const { removeErrors, removeSuccess } = UserSlice.actions;
export default UserSlice.reducer;
