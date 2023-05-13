import { redirect } from "react-router-dom";

function hasEmptyFields(...args) {
  return args.includes("");
}

function checkValidEmail(email) {
  const regex = /[^@]+@[^@]+\.[^@]+/;
  return regex.test(email);
}

function checkValidPassword(password) {
  return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
}

export function validateLoginInput(username, password) {
  if (hasEmptyFields(username, password)) {
    return "Both fields are required.";
  }
  return null;
}

export function validateSignupInput(
  firstname,
  lastname,
  email,
  password,
  password2
) {
  if (hasEmptyFields(firstname, lastname, email, password, password2)) {
    return "All 5 fields are required.";
  } else if (!checkValidEmail(email)) {
    return "Email is not valid.";
  } else if (password !== password2) {
    return "Your passwords don't match.";
  } else if (!checkValidPassword(password)) {
    return "Password must contain at least 8 characters, 1 uppercase letter, and 1 number.";
  }
  return null;
}

async function checkTokenValidity(token) {
  const response = await fetch(
    "https://jihundoh0109-humble-space-potato-57v96jp6q5gh77p6-5000.preview.app.github.dev/api/protected",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  if (data.message) {
    return true;
  }
  return false;
}

export function logout(authCtx, userCtx, navigate) {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  authCtx.setToken(null);
  userCtx.setId(-1);
  userCtx.setFullname("");
  userCtx.setEmail("");
  userCtx.setProjects(null);
  navigate("/");
}

export function login(authCtx, userCtx, navigate, userData) {
  localStorage.setItem("token", userData.access_token);
  localStorage.setItem("user", JSON.stringify(userData.user))
  authCtx.setToken(userData.access_token);
  userCtx.setId(userData.user.id);
  userCtx.setFullname(userData.user.name);
  userCtx.setEmail(userData.user.email);
  navigate("/dashboard");
}

export async function checkAuthAndRedirect(pageType) {
  const token = localStorage.getItem("token");
  if (pageType === "protected" && !token) {
    return redirect("/login");
  } else if (pageType === "protected" && token) {
    const tokenIsValid = await checkTokenValidity(token);
    if (!tokenIsValid) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return redirect("/login");
    }
  } else if (pageType === "unprotected" && token) {
    const tokenIsValid = await checkTokenValidity(token);
    if (tokenIsValid) {
      return redirect("/dashboard");
    }
  }
  return null;
}
