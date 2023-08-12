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
    setId(state, action) {
      state.id = action.payload.id;
    },
    setFirstname(state, action) {
      state.firstname = action.payload.firstname;
    },
    setLastname(state, action) {
      state.lastname = action.payload.lastname;
    },
    setEmail(state, action) {
      state.email = action.payload.email;
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
        userDataActions.setFirstname({
          firstname: formattedUser.firstname,
        })
      );
      dispatch(
        userDataActions.setLastname({
          lastname: formattedUser.lastname,
        })
      );
      dispatch(
        userDataActions.setEmail({
          email: formattedUser.email,
        })
      );
    }
  };
};

export const userDataActions = userDataSlice.actions;
export default userDataSlice.reducer;
