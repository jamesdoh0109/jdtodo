import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "pages/Root";
import Home from "pages/Home";
import Login from "pages/Login";
import Signup from "pages/Signup";
import Dashboard from "pages/Dashboard/Dashboard";
import Account from "pages/Account";
import ProjectDetail from "pages/Dashboard/ProjectDetail";
import ForgotPassword from "pages/ForgotPassword";
import ResetPassword from "pages/ResetPassword";
import RequireAuth from "components/Auth/RequireAuth";
import RequireResetPasswordToken from "components/Auth/RequireResetPasswordToken";
import PageNotFound from "pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route element={<RequireAuth pageProtected={false} />}>
            <Route path="" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route element={<RequireAuth pageProtected={true} />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/:projectId" element={<ProjectDetail />} />
            <Route path="account" element={<Account />} />
          </Route>
          <Route element={<RequireResetPasswordToken />}>
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
