import { createSlice } from "@reduxjs/toolkit";

const taskFormSlice = createSlice({
  name: "taskForm",
  initialState: {
    itemToBeEdited: {
      id: undefined,
      name: "",
      deadline: "",
      description: "",
      status: "",
    },
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

export const taskFormActions = taskFormSlice.actions;
export default taskFormSlice.reducer;
