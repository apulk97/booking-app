import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInterface } from "../pages/Register/index.types";
import * as api from '../api/index'

export const signup = createAsyncThunk(
  'auth/signup',
  async(formData: UserInterface)  => {
      try {
          const {data} = await api.signup(formData)
          return data
      } catch (err) {
          console.log(err);
          
      }})

export const authSlice = createSlice({
  initialState: { authData: {}, loading: false },
  name: "auth",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, { payload }: PayloadAction<any>) => {
        state.loading = false;
        state.authData = payload;
      })
      .addCase(signup.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
