import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from "../features/userSlice"
import storyReducer from "../features/storySlice"
import { commentReducer } from "../features/commentSlice"
import postUserDetailsReducer from '../features/postUserDetailsSlice'
import { sideBarSliceReducer } from "../features/sidebarSlice"
import { useDispatch } from 'react-redux'
import storage from "redux-persist/lib/storage"
import {
  persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import persistStore from 'redux-persist/lib/persistStore'
import { chatReducer } from '../features/chatSlice'
import { searchReducer } from '../features/searchSlice'
const rootReducer = combineReducers({
  userReducer: userReducer,
  storyReducer: storyReducer,
  commentReducer: commentReducer,
  postUserDetailsReducer: postUserDetailsReducer,
  sidebarReducer: sideBarSliceReducer,
  chatReducer: chatReducer,
  searchReducer: searchReducer
})
const persistConfig = {
  key: "root",
  storage,

}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
})
export const persistor = persistStore(store)

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export type RootState = ReturnType<typeof store.getState>
