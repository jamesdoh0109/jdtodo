import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { validateSignupInput } from "../util/auth";
import Button from "../components/Button";
import Input from "../components/Input";
import Message from "../components/Message";
import AccountCTA from "../components/AccountCTA";

export default function Signup() {
  const navigate = useNavigate();
  
  const [error, setError] = useState("");
  
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password2: "",
    },
    onSubmit: (values) => {
      handleSignup(values);
    },
  });

  const handleSignup = async ({
    firstname,
    lastname,
    email,
    password,
    password2,
  }) => {
    console.log(firstname);
    const signupError = validateSignupInput(
      firstname,
      lastname,
      email,
      password,
      password2
    );
    if (signupError) {
      setError(signupError);
    }
    try {
      const response = await fetch(
        "https://jihundoh0109-humble-space-potato-57v96jp6q5gh77p6-5000.preview.app.github.dev/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            password,
            password2,
          }),
        }
      );
      const data = await response.json();
      if (response.status !== 201) {
        setError(data.error);
      } else {
        navigate("/login");
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
          <h1 className="text-5xl font-bold">Sign Up</h1>
        </div>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={formik.handleSubmit}
        >
          <Input
            id="firstname"
            type="text"
            placeholder="First Name"
            handleChange={formik.handleChange}
            values={formik.values.firstname}
          />
          <Input
            id="lastname"
            type="text"
            placeholder="Last Name"
            handleChange={formik.handleChange}
            values={formik.values.lastname}
          />
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
          <Input
            id="password2"
            type="password"
            placeholder="Verify Password"
            handleChange={formik.handleChange}
            values={formik.values.password2}
          />
          <div>
            <Button text="Sign Up" />
          </div>
        </form>
        <AccountCTA
          message="Already have an account? &nbsp;"
          href="/login"
          action="Log In"
        />
      </div>
    </div>
  );
}
