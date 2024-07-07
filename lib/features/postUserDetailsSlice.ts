import { createSlice } from "@reduxjs/toolkit";

interface IpostUserDetails {
  name: string
}

const initialState: IpostUserDetails = {
  name: ""
}

export const postUserSlice = createSlice({
  name: "postUserSlice", initialState,
  reducers: {
    fetchPostUser(state, { payload }) {
      state.name = payload
    }

  }
})

export const { fetchPostUser } = postUserSlice.actions

export default postUserSlice.reducer
