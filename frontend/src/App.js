import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { checkAuthAndRedirect, checkPasswordResetTokenAndRedirect } from "./util/auth";
import { initialTokenFetchFromBrowswer } from "./store/reducers/auth";
import { initialUserDataFetchFromBrowswer } from "./store/reducers/user-data";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard/index";
import Account from "./pages/Account";
import ProjectDetail from "./pages/Dashboard/ProjectDetail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialTokenFetchFromBrowswer());
    dispatch(initialUserDataFetchFromBrowswer());
  }, [dispatch]);

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
          path: "/forgot-password",
          element: <ForgotPassword />,
          loader: () => checkAuthAndRedirect("unprotected")
        },
        {
          path: "/reset-password/:token",
          element: <ResetPassword />,
          loader: ({ params }) => checkPasswordResetTokenAndRedirect(params.token)
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
          path: "/dashboard/:projectId",
          element: <ProjectDetail />,
          loader: () => checkAuthAndRedirect("protected"),
        },
        {
          path: "/account",
          element: <Account />,
          loader: () => checkAuthAndRedirect("protected"),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
