import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  initialState: { authData: {} },
  name: "Auth",
  reducers: {
    saveUserData: (state, action) => {
      state.authData = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { saveUserData } = authSlice.actions;
