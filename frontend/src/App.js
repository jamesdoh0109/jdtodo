import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { initialUserDataFetchFromBrowswer } from "./store/reducers/userData";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import Account from "./pages/Account";
import ProjectDetail from "./pages/Dashboard/ProjectDetail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import RequireAuth from "./components/Auth/RequireAuth";
import RequireResetPasswordToken from "./components/Auth/RequireResetPasswordToken";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialUserDataFetchFromBrowswer());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RequireAuth pageProtected={false} />}>
          <Route path="/" element={<Root />}>
            <Route path="" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>
        </Route>
        <Route element={<RequireAuth pageProtected={true} />}>
          <Route path="/" element={<Root />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/:projectId" element={<ProjectDetail />} />
            <Route path="account" element={<Account />} />
          </Route>
        </Route>
        <Route element={<RequireResetPasswordToken />}>
          <Route path="/" element={<Root />}>
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
