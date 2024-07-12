import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetch: false,
      error: false,
    },
    register: {
      isFetch: false,
      error: false,
      success: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetch = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetch = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFailure: (state) => {
      state.login.isFetch = false;
      state.login.error = true;
    },

    registerStart: (state) => {
      state.register.isFetch = true;
    },
    registerSuccess: (state) => {
      state.register.isFetch = false;
      state.register.error = false;
      state.register.success = true;
    },
    registerFailure: (state) => {
      state.register.isFetch = false;
      state.register.error = true;
      state.register.success = false;
    },

    logoutStart: (state) => {
      state.login.isFetch = true;
    },
    logoutSuccess: (state) => {
      state.login.isFetch = false;
      state.login.error = false;
      state.login.currentUser = null;
    },
    logoutFailure: (state) => {
      state.login.isFetch = false;
      state.login.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} = authSlice.actions;

export default authSlice.reducer;
