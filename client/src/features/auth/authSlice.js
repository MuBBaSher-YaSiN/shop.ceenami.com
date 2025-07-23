// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null, // ✅ store accessToken directly
  role: null,
  authReady: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log("🔐 Setting credentials:", action.payload);
      const { user, accessToken, role } = action.payload;
      state.user = user;
      state.accessToken = accessToken; 
      state.role = role || user?.role || null; // ✅ fallback
      state.authReady = true; 
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.role = null;
      state.authReady = true; 
    },
    markAuthReady: (state) => {
    state.authReady = true;
  }
  },
});

export const { setCredentials, logout,markAuthReady } = authSlice.actions;
export default authSlice.reducer;
