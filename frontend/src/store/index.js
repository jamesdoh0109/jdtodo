import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './reducers/auth';
import ModalReducer from './reducers/modal';
import UserDataReducer from './reducers/user-data'
import ProjectFormReducer from './reducers/project-form';

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    modal: ModalReducer,
    userData: UserDataReducer,
    projectForm: ProjectFormReducer
  },
});

export default store;