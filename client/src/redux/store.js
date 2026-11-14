import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./userSlice"
export const store = configureStore({
  reducer: {
    //box dala hai store mei
    user: userSlice
  }
})