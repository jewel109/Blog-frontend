import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../features/userSlice"
import storyReducer from "../features/storySlice"
import commentReducer from "../features/commentSlice"
import { useDispatch } from 'react-redux'
export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    storyReducer: storyReducer,
    commentReducer: commentReducer
  }
})

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export type RootState = ReturnType<typeof store.getState>
