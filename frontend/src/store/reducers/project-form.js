import { createSlice } from "@reduxjs/toolkit";

const projectFormSlice = createSlice({
  name: "projectForm",
  initialState: {
    creatingNew: true,
    projectToBeEdited: null,
  },
  reducers: {
    onEditProject(state, action) {
      state.creatingNew = false;
      state.projectToBeEdited = action.payload.projectToBeEdited;
    },
    onCreateProject(state) {
      state.creatingNew = true;
      state.projectToBeEdited = null;
    },
  },
});

export const projectFormActions = projectFormSlice.actions;
export default projectFormSlice.reducer;
