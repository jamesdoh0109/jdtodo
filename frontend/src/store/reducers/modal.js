import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalOpen: false
  },
  reducers: {
    toggle(state) {
      state.modalOpen = !state.modalOpen
    }
  }
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;