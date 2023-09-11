import { createSlice } from "@reduxjs/toolkit";

const projectFormSlice = createSlice({
  name: "projectForm",
  initialState: {
    itemToBeEdited: { id: undefined, name: "" },
  },
  reducers: {
    onEdit(state, action) {
      state.itemToBeEdited = action.payload.itemToBeEdited;
    },
    onReset(state) {
      state.itemToBeEdited = { id: undefined, name: "" };
    },
  },
});

export const projectFormActions = projectFormSlice.actions;
export default projectFormSlice.reducer;
