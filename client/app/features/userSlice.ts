import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fakeapi } from "../page";

interface UsersState {
  users: Array<{
    id: number;
    name: string;
    // email: string;
    //role: string;
    // Add more properties as needed
  }>;
  loading: boolean; // Indicates whether data is being fetched
  error: string | null; // Stores any error messages
  success: boolean | null;
}

const initialState: UsersState = {
  users: [{ id: 1, name: "jewel", },], // Start with an empty user list
  loading: false, // Not loading initially
  error: null,
  success: null// No errors initially
};
export const registerUser = createAsyncThunk('users/userRegister',
  async (user: UsersState) => {
    const response = await fetch(`${fakeapi}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Registration failed');
    }
  })
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Fetch users
    fetchUsersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUsersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Add new user
    addUser(state, action) {
      state.users.push(action.payload);
    },

    // Update existing user
    updateUser(state, action) {
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },

    // Delete user
    deleteUser(state, action) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
})

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure, } = userSlice.actions
export default userSlice.reducer 
