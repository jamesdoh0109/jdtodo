import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthProvider from './store/AuthProvider';
import UserDataProvider from './store/UserDataProvider';
import ModalProvider from './store/ModalProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <UserDataProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </UserDataProvider>
  </AuthProvider>
);

