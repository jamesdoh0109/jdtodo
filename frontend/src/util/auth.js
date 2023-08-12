import { redirect } from "react-router-dom";
import { authActions } from "../store/reducers/auth";
import { userDataActions } from "../store/reducers/userData";
import * as yup from "yup";

export const emailValidator = yup
  .string()
  .email("Email is not valid")
  .required("Email is required");

export const passwordValidator = yup
  .string()
  .required("Password is required");

export const passwordNewValidator = yup
  .string()
  .min(8, "Password must contain at least 8 characters")
  .matches(
    /^(?=.*[A-Z])(?=.*\d)/,
    "Password must contain at least 1 uppercase letter and 1 number"
  )
  .required("Password is required");

export const passwordConfirmValidator = (password) =>
  yup
    .string()
    .oneOf(password, "Passwords must match")
    .required("Please verify your password");

export const firstnameValidator = yup
  .string()
  .required("First name is required");

export const lastnameValidator = yup.string().required("Last name is required");

export function hasEmptyFields(...args) {
  return args.includes("");
}

function fieldIsEmpty(field) {
  return field === "";
}

function checkValidEmail(email) {
  const regex = /^[\w+%.-]+@[\w.-]+\.[A-Za-z]{2,7}/;
  return regex.test(email);
}

function checkValidPassword(password) {
  return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
}

export function validateChangePasswordInputs(
  { passwordCurrent, passwordNew, passwordConfirm },
  errors
) {
  if (!checkValidPassword(passwordNew) && passwordNew !== "") {
    errors.passwordNew =
      "Password must contain at least 8 characters, 1 uppercase letter, and 1 number";
  } else if (passwordNew !== passwordConfirm && passwordConfirm !== "") {
    errors.passwordConfirm = "Passwords must match";
  }
  return errors;
}

export function validateEditUserInputs({ firstname, lastname, email }, errors) {
  if (!checkValidEmail(email) && email !== "") {
    errors.email = "Email is not valid";
  }
  return errors;
}

export function validateForgotPasswordInput({ email }, errors) {
  if (!checkValidEmail(email) && email !== "") {
    errors.email = "Email is not valid";
  }
  return errors;
}

export function validateResetPasswordInputs(
  { password, passwordConfirm },
  errors
) {
  if (!checkValidPassword(password) && password !== "") {
    errors.password =
      "Password must contain at least 8 characters, 1 uppercase letter, and 1 number";
  } else if (password !== passwordConfirm && passwordConfirm !== "") {
    errors.passwordConfirm = "Passwords must match";
  }
  return errors;
}

export function validateLogInInputs({ email, password }, errors) {
  if (!checkValidEmail(email) && email !== "") {
    errors.email = "Email is not valid";
  }
  return errors;
}

export function validateSignUpInputs(
  { firstname, lastname, email, password, passwordConfirm },
  errors
) {
  if (!checkValidEmail(email) && email !== "") {
    errors.email = "Email is not valid";
  }
  if (!checkValidPassword(password) && password !== "") {
    errors.password =
      "Password must contain at least 8 characters, 1 uppercase letter, and 1 number";
  } else if (password !== passwordConfirm && passwordConfirm !== "") {
    errors.passwordConfirm = "Passwords must match";
  }
  return errors;
}

export function checkForInputErrors(form) {
  const numInputs = Object.keys(form).length;
  switch (numInputs) {
    case 1:
      return validateForgotPasswordInput(form);
    case 2:
      return form.hasOwnProperty("password2")
        ? validateResetPasswordInputs(form)
        : validateLogInInputs(form);
    case 3:
      return "currentPassword" in form
        ? validateChangePasswordInputs(form)
        : validateEditUserInputs(form);
    default:
      return validateSignUpInputs(form);
  }
}

async function checkTokenValidity(token) {
  const response = await fetch(
    "https://jihundoh0109-stunning-guide-7j7xq64644p2xrpx-5000.app.github.dev/api/protected",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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
  //dispatch(userDataActions.setProjects({ projects: null }));
  navigate("/");
}

export function login(dispatch, navigate, userData) {
  localStorage.setItem("token", userData.access_token);
  localStorage.setItem("user", JSON.stringify(userData.user));
  dispatch(authActions.setToken({ token: userData.access_token }));
  dispatch(userDataActions.setId({ id: userData.user.id }));
  dispatch(
    userDataActions.setFirstname({ firstname: userData.user.firstname })
  );
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

export async function checkPasswordResetTokenAndRedirect(token) {
  const response = await fetch(
    "https://jihundoh0109-stunning-guide-7j7xq64644p2xrpx-5000.app.github.dev/api/verify_reset_password_token/" +
      token
  );
  if (response.status === 404 || response.status === 403) {
    return redirect("/");
  }
  return null;
}
