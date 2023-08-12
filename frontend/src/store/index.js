import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/auth";
import ModalReducer from "./reducers/modal";
import UserDataReducer from "./reducers/userData";
import ProjectFormReducer from "./reducers/projectForm";
import TaskFormReducer from "./reducers/taskForm";
import TaskDetailReducer from "./reducers/taskDetail";
import DropdownReducer from "./reducers/dropdown";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    modal: ModalReducer,
    userData: UserDataReducer,
    projectForm: ProjectFormReducer,
    taskForm: TaskFormReducer,
    taskDetail: TaskDetailReducer,
    dropdown: DropdownReducer,
  },
});

export default store;
