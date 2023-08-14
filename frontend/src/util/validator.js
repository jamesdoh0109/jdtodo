import * as yup from "yup";

export const taskNameValidator = yup
  .string()
  .max(60, "Project name must contain less than 60 characters")
  .required("Task name is required");

export const taskDeadlineValidator = yup
  .date()
  .required("Task deadline is required");

export const taskDescriptionValidator = yup
  .string()
  .max(300, "Description must contain less than 300 characters");

export const projectNameValidator = yup
  .string()
  .max(25, "Project name must contain less than 25 characters")
  .required("Project name is required");

const customEmailRegex = /^[\w+%.-]+@[\w.-]+\.[A-Za-z]{2,7}$/;

export const emailValidator = yup
  .string()
  .test("email", "Email is not valid", (value) => {
    return customEmailRegex.test(value || "");
  })
  .required("Email is required");

export const passwordValidator = yup.string().required("Password is required");

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
