export async function checkTokenValidity() {
  const resp = await fetch(
    "https://stunning-space-memory-57v96jpjjjwcr97-5000.app.github.dev/api/protected",
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
    "https://stunning-space-memory-57v96jpjjjwcr97-5000.app.github.dev/api/verify_reset_password_token/" +
      token
  );
  return response.status !== 404 && response.status !== 403;
}
