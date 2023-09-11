import * as yup from "yup";

export const taskNameValidator = yup
  .string()
  .max(60, "Task name must contain less than 60 characters")
  .required("Task name is required")
  .matches(/\S/, "Task name must contain at least one non-space character");

export const taskDeadlineValidator = yup
  .date()
  .min(new Date(), "Task deadline cannot be in the past")
  .required("Task deadline is required");

export const taskDescriptionValidator = yup
  .string()
  .nullable() // allow the description to be null (init val) since it is optional
  .max(300, "Task description must contain less than 300 characters");

export const projectNameValidator = yup
  .string()
  .max(25, "Project name must contain less than 25 characters")
  .required("Project name is required")
  .matches(/\S/, "Project name must contain at least one non-space character");

const customEmailRegex = /^[\w+%.-]+@[\w.-]+\.[A-Za-z]{2,7}$/;

export const emailValidator = yup
  .string()
  .required("Email is required")
  .test("email", "Email is not valid", (value) => {
    return customEmailRegex.test(value || "");
  });

export const passwordValidator = yup.string().required("Password is required");

export const createPasswordValidator = yup
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
  .required("First name is required")
  .matches(/\S/, "First name must contain at least one non-space character");

export const lastnameValidator = yup
  .string()
  .required("Last name is required")
  .matches(/\S/, "Last name must contain at least one non-space character");
