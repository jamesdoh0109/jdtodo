import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload.token;
    },
  },
});

export const initialTokenFetchFromBrowswer = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(
        authActions.setToken({
          token: token,
        })
      );
    }
  };
};

export const authActions = authSlice.actions;
export default authSlice.reducer;
