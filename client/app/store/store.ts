import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../features/userSlice"
import { useDispatch } from 'react-redux'
export const store = configureStore({
  reducer: {
    userReducer: userReducer
  }
})

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export type RootState = ReturnType<typeof store.getState>
