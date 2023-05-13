import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { checkAuthAndRedirect } from "./util/auth";

import Root from "./pages/Root";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { initialTokenFetchFromBrowswer } from "./store/reducers/auth";
import { initialUserDataFetchFromBrowswer } from "./store/reducers/user-data";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialTokenFetchFromBrowswer());
    dispatch(initialUserDataFetchFromBrowswer());
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />,
          loader: () => checkAuthAndRedirect("unprotected"),
        },
        {
          path: "/login",
          element: <Login />,
          loader: () => checkAuthAndRedirect("unprotected"),
        },
        {
          path: "/signup",
          element: <Signup />,
          loader: () => checkAuthAndRedirect("unprotected"),
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
          loader: () => checkAuthAndRedirect("protected"),
        },
        {
          path: "/account",
          element: <Account />,
          loader: () => checkAuthAndRedirect("protected")
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
