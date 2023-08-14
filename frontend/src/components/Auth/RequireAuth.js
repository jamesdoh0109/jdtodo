import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { authActions } from "store/reducers/auth";
import { checkTokenValidity } from "util/auth";

export default function RequireAuth({ pageProtected }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const checkIsAuthenticated = async () => {
      const tokenValid = await checkTokenValidity();
      if (!tokenValid) {
        isAuthenticated && dispatch(authActions.deauthenticateUser());
      } else {
        !isAuthenticated && dispatch(authActions.authenticateUser());
      }
      dispatch(authActions.completeLoading());
    };
    checkIsAuthenticated();
  }, [dispatch, isAuthenticated]);

  if (pageProtected) {
    return (
      !isLoading &&
      (isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      ))
    );
  }
  return (
    !isLoading &&
    (!isAuthenticated ? (
      <Outlet />
    ) : (
      <Navigate to="/dashboard" state={{ from: location }} replace />
    ))
  );
}
