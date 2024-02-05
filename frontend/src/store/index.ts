import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import saveUserData from "../slices/authSlice";
import thunk  from "redux-thunk";
const store = configureStore({
  reducer: {
    auth: saveUserData,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
