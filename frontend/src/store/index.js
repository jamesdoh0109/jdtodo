import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/auth";
import ModalReducer from "./reducers/modal";
import UserDataReducer from "./reducers/user-data";
import FormReducer from "./reducers/form";
import DropdownReducer from "./reducers/dropdown";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    modal: ModalReducer,
    userData: UserDataReducer,
    form: FormReducer,
    dropdown: DropdownReducer,
  },
});

export default store;
