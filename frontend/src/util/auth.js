import { userDataActions } from "../store/reducers/userData";

export function login(dispatch, userData) {
  localStorage.setItem("user", JSON.stringify(userData.user));
  dispatch(userDataActions.setId({ id: userData.user.id }));
  dispatch(
    userDataActions.setFirstname({ firstname: userData.user.firstname })
  );
  dispatch(userDataActions.setLastname({ lastname: userData.user.lastname }));
  dispatch(userDataActions.setEmail({ email: userData.user.email }));
}

export function logout(dispatch) {
  localStorage.removeItem("user");
  dispatch(userDataActions.setId({ id: -1 }));
  dispatch(userDataActions.setFirstname({ firstname: "" }));
  dispatch(userDataActions.setLastname({ lastname: "" }));
  dispatch(userDataActions.setEmail({ email: "" }));
}

export async function checkTokenValidity() {
  const resp = await fetch(
    "https://jihundoh0109-stunning-guide-7j7xq64644p2xrpx-5000.app.github.dev/api/protected",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    }
  );
  return resp.status !== 401;
}

export async function checkResetPasswordToken(token) {
  const response = await fetch(
    "https://jihundoh0109-stunning-guide-7j7xq64644p2xrpx-5000.app.github.dev/api/verify_reset_password_token/" +
      token
  );
  return response.status !== 404 && response.status !== 403;
}
