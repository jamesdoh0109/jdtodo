import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/auth";
import ModalReducer from "./reducers/modal";
import UserDataReducer from "./reducers/user-data";
import FormReducer from "./reducers/form";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    modal: ModalReducer,
    userData: UserDataReducer,
    form: FormReducer,
  },
});

export default store;
