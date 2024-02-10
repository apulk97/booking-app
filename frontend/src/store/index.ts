import {  configureStore } from "@reduxjs/toolkit";
import saveUserData from "../slices/authSlice";
import searchData from "../slices/searchSlice";
const store = configureStore({
  reducer: {
    auth: saveUserData,
    search: searchData
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
