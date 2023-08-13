import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { checkResetPasswordToken } from "../../util/auth";

export default function RequireResetPasswordToken() {
  const resetPasswordToken = useParams().token;
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const checkIsAuthenticated = async () => {
      const tokenValid = await checkResetPasswordToken(resetPasswordToken);
      tokenValid && setIsAuthenticated(true);
      setIsLoading(false);
    };
    checkIsAuthenticated();
  }, []);

  return (
    !isLoading &&
    (isAuthenticated ? (
      <Outlet />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    ))
  );
}
