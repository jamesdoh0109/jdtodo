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
