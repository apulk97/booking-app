import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInterface } from "../pages/Register/index.types";
import {AuthDataType} from '../../../backend/src/shared/index.types'

import * as api from "../api/index";

interface SigninInterface {
  formData: UserInterface,
  navigate: any
}

export const signup = createAsyncThunk("auth/signup", async (args: SigninInterface) => {
  try {
    const { data } = await api.signup(args.formData);
    args.navigate('/')
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const signin = createAsyncThunk("auth/signin", async (args: SigninInterface) => {
  try {
    const { data } = await api.signin(args.formData);
    args.navigate('/')
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const authSlice = createSlice({
  initialState : { authData: {result: {}, token: ''}, loading: false } as  { authData: AuthDataType; loading: boolean },
  name: "auth",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, { payload }: PayloadAction<AuthDataType>) => {
        localStorage.setItem('profile', JSON.stringify(payload.result))
        localStorage.setItem('token', JSON.stringify(payload.token))
        state.loading = false;
        state.authData = payload;
      })
      .addCase(signup.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, { payload }: PayloadAction<any>) => {
        localStorage.setItem('profile', JSON.stringify(payload.result))
        localStorage.setItem('token', JSON.stringify(payload.token))
        state.loading = false;
        state.authData = payload;
      })
      .addCase(signin.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
