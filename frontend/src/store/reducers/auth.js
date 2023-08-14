import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isLoading: true,
  },
  reducers: {
    authenticateUser(state) {
      state.isAuthenticated = true;
    },
    deauthenticateUser(state) {
      state.isAuthenticated = false;
    },
    completeLoading(state) {
      state.isLoading = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
