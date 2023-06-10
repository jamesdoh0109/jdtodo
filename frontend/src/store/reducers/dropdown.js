import { createSlice } from "@reduxjs/toolkit";

const dropdownSlice = createSlice({
  name: "dropdown",
  initialState: {
    dropdownId: -1
  },
  reducers: {
    toggleDropdown(state, action) {
      state.dropdownId = action.payload.dropdownId;
    },
  },
});

export const dropdownActions = dropdownSlice.actions;
export default dropdownSlice.reducer;
