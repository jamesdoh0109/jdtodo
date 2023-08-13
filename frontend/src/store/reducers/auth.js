import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    onLogin(state) {
      state.isAuthenticated = true;
    },
    onLogout(state) {
      state.isAuthenticated = false; 
    }
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
