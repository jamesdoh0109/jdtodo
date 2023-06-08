import { createSlice } from "@reduxjs/toolkit";

const dropdownSlice = createSlice({
  name: "dropdown",
  initialState: {
    dropdownIndex: -1
  },
  reducers: {
    toggleDropdown(state, action) {
      state.dropdownIndex = action.payload.dropdownIndex;
    },
  },
});

export const dropdownActions = dropdownSlice.actions;
export default dropdownSlice.reducer;
