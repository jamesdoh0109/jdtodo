import { redirect } from "react-router-dom";
import { authActions } from "../store/reducers/auth";
import { userDataActions } from "../store/reducers/user-data";

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

function validateEditUserInput({ firstname, lastname, email }) {
  if (hasEmptyFields(firstname, lastname, email)) {
    return "You can't have an empty field.";
  } else if (!checkValidEmail(email)) {
    return "Email is not valid.";
  }
  return null;
}

function validateLoginInput({ email, password }) {
  if (hasEmptyFields(email, password)) {
    return "Both fields are required.";
  }
  return null;
}

function validateSignupInput({
  firstname,
  lastname,
  email,
  password,
  password2,
}) {
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

export function checkForInputErrors(form) {
  const numInputs = Object.keys(form).length;
  switch (numInputs) {
    case 2:
      return validateLoginInput(form);
    case 3:
      return validateEditUserInput(form);
    default:
      return validateSignupInput(form);
  }
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
  return data.message ? true : false;
}

export function logout(dispatch, navigate) {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch(authActions.setToken({ token: null }));
  dispatch(userDataActions.setId({ id: -1 }));
  dispatch(userDataActions.setFirstname({ firstname: "" }));
  dispatch(userDataActions.setLastname({ lastname: "" }));
  dispatch(userDataActions.setEmail({ email: "" }));
  dispatch(userDataActions.setProjects({ projects: null }));
  navigate("/");
}

export function login(dispatch, navigate, userData) {
  localStorage.setItem("token", userData.access_token);
  localStorage.setItem("user", JSON.stringify(userData.user));
  dispatch(authActions.setToken({ token: userData.access_token }));
  dispatch(userDataActions.setId({ id: userData.user.id }));
  dispatch(userDataActions.setFirstname({ firstname: userData.user.firstname }));
  dispatch(userDataActions.setLastname({ lastname: userData.user.lastname }));
  dispatch(userDataActions.setEmail({ email: userData.user.email }));
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
