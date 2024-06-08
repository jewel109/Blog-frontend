import { createSlice } from "@reduxjs/toolkit"


interface ChatI {
  username: string,
  messageSent: boolean
}


const chat: ChatI = {
  username: "",
  messageSent: false
}


const chatSlice = createSlice({
  name: "chat reducer",
  initialState: chat,
  reducers: {
    setChatUser(state, { payload }) {
      state.username = payload
    },
    setMessageSent(state) {
      state.messageSent = !state.messageSent
    }
  }
})


export const { setChatUser, setMessageSent } = chatSlice.actions

export const chatReducer = chatSlice.reducer
