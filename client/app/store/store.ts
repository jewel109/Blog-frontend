import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from "../features/userSlice"
import storyReducer from "../features/storySlice"
import commentReducer from "../features/commentSlice"
import { useDispatch } from 'react-redux'
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import {
  persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import persistStore from 'redux-persist/lib/persistStore'

const rootReducer = combineReducers({
  userReducer: userReducer,
  storyReducer: storyReducer,
  commentReducer: commentReducer
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
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export const persistor = persistStore(store)

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export type RootState = ReturnType<typeof store.getState>
