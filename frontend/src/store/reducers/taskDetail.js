import { createSlice } from "@reduxjs/toolkit";

const taskDetailSlice = createSlice({
  name: "taskDetail",
  initialState: {
    itemToBeShown: {
      id: -1,
      name: "",
      deadline: "",
      description: "",
      status: "",
    },
  },
  reducers: {
    onShowDetails(state, action) {
      state.itemToBeShown = action.payload.itemToBeShown;
    },
    onReset(state) {
      state.itemToBeShown = { id: -1, name: "" };
    },
  },
});

export const taskDetailActions = taskDetailSlice.actions;
export default taskDetailSlice.reducer;
