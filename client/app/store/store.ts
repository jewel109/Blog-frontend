import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../features/userSlice'
console.log(userSlice)
export const store = configureStore({
  reducer: {
    users: userSlice
  }
})
