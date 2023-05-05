import { redirect } from "react-router-dom";

function hasEmptyFields(...args) {
  return args.includes('');
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
    return "Both fields are required."
  }
  return null; 
}

export function validateSignupInput(firstname, lastname, email, password, password2) {
  if (hasEmptyFields(firstname, lastname, email, password, password2)) {
    return "All 5 fields are required."; 
  } else if (!checkValidEmail(email)) {
    return "Email is not valid."
  } else if (password !== password2) {
    return "Your passwords don\'t match."; 
  } else if (!checkValidPassword(password)) {
    return "Password must contain at least 8 characters, 1 uppercase letter, and 1 number."
  }
  return null; 
}

export function checkAuthAndRedirect(pageType) {
  const token = localStorage.getItem("token");
  if (!token && pageType==='protected') {
    return redirect('/login')
  } else if (token && pageType==='unprotected') {
    return redirect('/dashboard')
  }
  return null;
}