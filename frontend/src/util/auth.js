const BASE_URL = process.env.REACT_APP_BASE_BACKEND_URL;

export async function checkTokenValidity() {
  const resp = await fetch(
    `${BASE_URL}/api/protected`,
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
  const response = await fetch(`${BASE_URL}/api/verify_reset_password_token/${token}`);
  return response.status !== 404 && response.status !== 403;
}
