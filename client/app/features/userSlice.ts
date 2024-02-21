
import axiosInstance from "@/lib/axios";
import axiosError from "@/lib/axiosError";
import { asyncThunkCreator, createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { userAgent } from "next/server";


interface userState {
  username: string;
  email: string,
  password: string,
  loading: boolean; // indicates whether data is being fetched
  error: string | null; // stores any error messages
  success: boolean | null;
}
export const registerUser = createAsyncThunk("user/register", async (user: userState) => {
  try {

    const { data } = await axiosInstance.post("/auth/register", user)
    const { token } = data ? data : null
    console.log(token)
    const savedToken = localStorage.getItem("token") ?? null

    localStorage.setItem("token", "")
    if (!savedToken) {
      localStorage.setItem("token", token)
    }
    if (!data) {
      return new Error("no data found")
    }
    return data

    const tok = localStorage.getItem("token")
    console.log(tok)
  } catch (error) {

    const err = axiosError(error)
    console.log(err)
    return err
  }

})

export const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {

  },
  extraReducer: (builder) => {
    builder
      .addCase(registerUser.pending, (state: userState) => {
        state.loading = true;
        state.error = null;
        state.success = null;
        console.log(state)
      })
      .addCase(registerUser.fulfilled, (state: userState, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state: userState, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log(state)
      });
  },

})

export default userSlice.reducer
