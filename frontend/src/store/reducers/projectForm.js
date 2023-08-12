import { createSlice } from "@reduxjs/toolkit";

const projectFormSlice = createSlice({
  name: "projectForm",
  initialState: {
    itemToBeEdited: { id: -1, name: "" },
  },
  reducers: {
    onEdit(state, action) {
      state.itemToBeEdited = action.payload.itemToBeEdited;
    },
    onReset(state) {
      state.itemToBeEdited = { id: -1, name: "" };
    },
  },
});

export const projectFormActions = projectFormSlice.actions;
export default projectFormSlice.reducer;
