import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalOpen: false,
    modalType: "",
  },
  reducers: {
    toggle(state, action) {
      state.modalOpen = action.payload.modalOpen;
      state.modalType = action.payload.modalType;
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
