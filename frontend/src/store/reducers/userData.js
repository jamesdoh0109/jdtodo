import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    id: -1,
    firstname: "",
    lastname: "",
    email: "",
  },
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
      localStorage.setItem("user", JSON.stringify(state));
    },
    removeUser(state) {
      state.id = -1;
      state.firstname = "";
      state.lastname = "";
      state.email = "";
    },
  },
});

export const initialUserDataFetchFromBrowswer = () => {
  return (dispatch) => {
    const user = localStorage.getItem("user");
    if (user) {
      const formattedUser = JSON.parse(user);
      dispatch(
        userDataActions.setUser({
          id: formattedUser.id,
          firstname: formattedUser.firstname,
          lastname: formattedUser.lastname,
          email: formattedUser.email,
        })
      );
    }
  };
};

export const userDataActions = userDataSlice.actions;
export default userDataSlice.reducer;
