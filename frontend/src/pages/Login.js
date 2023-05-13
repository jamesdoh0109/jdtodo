import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { login, validateLoginInput } from "../util/auth";
import Button from "../components/Button";
import Input from "../components/Input";
import Message from "../components/Message";
import AccountCTA from "../components/AccountCTA";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const handleLogin = async ({ email, password }) => {
    const loginError = validateLoginInput(email, password);
    if (loginError) {
      setError(loginError);
    }
    try {
      const response = await fetch(
        "https://jihundoh0109-humble-space-potato-57v96jp6q5gh77p6-5000.preview.app.github.dev/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim(" "),
            password: password,
          }),
        }
      );
      const data = await response.json();
      if (response.status !== 200) {
        setError(data.error);
      } else {
        login(dispatch, navigate, data);
      }
    } catch (e) {
      setError(e);
    }
  };

  return (
    <div className="m-auto text-center py-10">
      {error && <Message error={error} />}
      <div className="mx-auto flex flex-col gap-5 w-80">
        <div className="title">
          <h1 className="text-5xl font-bold">Log In</h1>
        </div>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={formik.handleSubmit}
        >
          <Input
            id="email"
            type="text"
            placeholder="Email"
            handleChange={formik.handleChange}
            values={formik.values.email}
          />
          <Input
            id="password"
            type="password"
            placeholder="Password"
            handleChange={formik.handleChange}
            values={formik.values.password}
          />
          <div className="flex items-center justify-between">
            <Button text="Log In" />
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to={"/"}
            >
              Forgot Password?
            </Link>
          </div>
        </form>
        <AccountCTA
          message="Don't have an account? &nbsp;"
          href="/signup"
          action="Sign Up"
        />
      </div>
    </div>
  );
}
