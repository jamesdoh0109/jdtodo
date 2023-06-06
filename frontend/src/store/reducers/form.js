import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    creatingNew: true,
    itemToBeEdited: null,
  },
  reducers: {
    onEdit(state, action) {
      state.creatingNew = false;
      state.itemToBeEdited = action.payload.itemToBeEdited;
    },
    onCreate(state) {
      state.creatingNew = true;
      state.itemToBeEdited = null;
    },
  },
});

export const formActions = formSlice.actions;
export default formSlice.reducer;
