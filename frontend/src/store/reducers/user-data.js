import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    id: -1,
    fullname: "",
    email: "",
    projects: null,
  },
  reducers: {
    setId(state, action) {
      state.id = action.payload.id;
    },
    setFullname(state, action) {
      state.fullname = action.payload.fullname;
    },
    setEmail(state, action) {
      state.email = action.payload.email;
    },
    setProjects(state, action) {
      state.projects = action.payload.projects;
    },
  },
});

export const initialUserDataFetchFromBrowswer = () => {
  return (dispatch) => {
    const user = localStorage.getItem("user");
    if (user) {
      const formattedUser = JSON.parse(user);
      dispatch(
        userDataActions.setId({
          id: formattedUser.id,
        })
      );
      dispatch(
        userDataActions.setFullname({
          fullname: formattedUser.fullname,
        })
      );
      dispatch(
        userDataActions.setEmail({
          email: formattedUser.email,
        })
      );
      dispatch(
        userDataActions.setProjects({
          projects: formattedUser.projects,
        })
      );
    }
  };
};

export const userDataActions = userDataSlice.actions;
export default userDataSlice.reducer;
