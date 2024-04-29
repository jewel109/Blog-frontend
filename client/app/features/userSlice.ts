
import axiosInstance from "@/lib/axios";
import axiosError from "@/lib/axiosError";
import { asyncThunkCreator, createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { userAgent } from "next/server";


interface userState {
  username: string | null;
  email: string,
  password: string,
  loading: boolean; // indicates whether data is being fetched
  error: string | null; // stores any error messages
  success: boolean | null;
}
export const accessUser = createAsyncThunk("user/getAccessToServer", async () => {
  try {

    const token = localStorage.getItem("token")

    console.log(token)
    if (!token) {
      return null
    }
    const { data } = await axiosInstance.get("/auth/private", { headers: { "Authorization": `Bearer ${token}` } })
    console.log(data?.user?.username)
    return data
    return data.user.username
  } catch (err) {
    const error = err as AxiosError
    console.log("accessUser " + error)
    return axiosError(error)
  }
})
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
  } catch (err) {

    const error = err as AxiosError

    console.log(err)
    axiosError(error)
  }

})
export const loginUser = createAsyncThunk("user/login", async ({ email, password }) => {
  //al type must be refactored
  try {

    const { data } = await axiosInstance.post("/auth/login", { email, password })
    if (!data.token) {
      return new Error("no token found in response") // must be fixed the trouble lsp felling
    }
    console.log(data)
    // localStorage.setItem("token", "")
    if (!data) {
      return new Error("token is not valid")
    } else {
      localStorage.setItem("token", data.token)
    }
    const tok = localStorage.getItem("token")
    console.log(tok)
    if (!data.success) {
      return new Error("no success value in token")
    } else {
      return data.success
    }

  } catch (err) {
    const error = err as AxiosError
    console.log("loginUser " + error)
    axiosError(error)
  }

})

const initialState: userState = {
  username: "",
  email: "",
  password: "",
  loading: false,
  error: null,
  success: false
}

export const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    logOutUser(state, { payload }) {
      state.username = ""

    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state: userState) => {
        state.loading = true;
        state.error = null;
        state.success = null;
        console.log(state)
        console.log(current(state))
      })
      .addCase(registerUser.fulfilled, (state: userState, action) => {
        state.loading = false;
        state.success = true;
        console.log(current(state))
      })
      .addCase(registerUser.rejected, (state: userState, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log(state)
        console.log(current(state))
      });
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state: userState) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(loginUser.fulfilled, (state: userState, action) => {
        state.loading = false;
        state.success = true;
        console.log(current(state))

      })
      .addCase(loginUser.rejected, (state: userState, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

  },

  extraReducers: (builder) => {
    builder
      .addCase(accessUser.pending, (state: userState) => {
        state.loading = true;
        state.error = null;
        state.success = null;
        console.log(state)
        console.log(current(state))
      })
      .addCase(accessUser.fulfilled, (state: userState, { payload }) => {
        state.username = payload
        state.loading = false;
        state.success = true;
        state.username = payload?.user?.username
        console.log(current(state))
      })
      .addCase(accessUser.rejected, (state: userState, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log(state)
        console.log(current(state))
      });
  },



})
export const { logOutUser } = userSlice.actions

export default userSlice.reducer
