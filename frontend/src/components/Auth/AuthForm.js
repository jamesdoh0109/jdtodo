import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, checkForInputErrors } from "../../util/auth";
import { prepareForm, trimFormTrailingSpaces } from "../../util/form";
import useFetch from "../../hooks/useFetch";
import Button from "../common/Button";
import Input from "../common/Input";
import Message from "../common/Message";
import AccountCTA from "./AccountCTA";

export default function AuthForm({
  title,
  formInputs,
  btnTxt,
  btnLoadingtTxt,
  callToAction,
  resetPasswordToken,
}) {
  const [form, setForm] = useState(prepareForm(formInputs));

  const { isLoading, status, setStatus, fetchData } = useFetch();

  const isLogInForm = title === "Log In";
  const isForgotPassword = title === "Forgot Password";
  const isResetPassword = title === "Reset Password";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const inputError = checkForInputErrors(form);
    if (inputError) {
      setStatus({ error: true, message: inputError });
    } else {
      submitForm();
    }
  };

  const handleResponse = async (res) => {
    try {
      const data = await res.json();
      if (res.status !== 201 && res.status !== 200) {
        setStatus({
          error: true,
          message: data.error ? data.error : data.message,
        });
      } else if (res.status === 200 && isLogInForm) {
        login(dispatch, navigate, data);
      } else if (res.status === 200 && isForgotPassword) {
        setStatus({
          error: false,
          message: data.message,
        });
      } else if (
        res.status === 201 ||
        (res.status === 200 && isResetPassword)
      ) {
        navigate("/login");
      }
    } catch (e) {
      setStatus({ error: true, message: e });
    }
  };

  const submitForm = () => {
    const endpoint = `/api/${title
      .replace(/\s/g, isForgotPassword || isResetPassword ? "_" : "")
      .toLowerCase()}${resetPasswordToken ? `/${resetPasswordToken}` : ""}`;

    const requestConfig = {
      url: endpoint,
      method: isResetPassword ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(trimFormTrailingSpaces(form)),
    };
    fetchData(requestConfig, undefined, handleResponse);
  };

  const formTitle = (
    <div className="title">
      <h1
        className={`${
          isForgotPassword || isResetPassword ? "text-4xl" : "text-5xl"
        } font-bold`}
      >
        {title}
      </h1>
    </div>
  );

  const forgotPassword = (
    <Link
      className={`inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 ${
        isLoading && "pointer-events-none"
      }`}
      to={"/forgot-password"}
    >
      Forgot Password?
    </Link>
  );

  const backToLogIn = (
    <Link
      className={`inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 ${
        isLoading && "pointer-events-none"
      }`}
      to={"/login"}
    >
      Back to login
    </Link>
  );

  const formComponent = (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleOnSubmit}
    >
      {formInputs.map(({ name, type, placeholder }) => (
        <Input
          key={name}
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={handleOnChange}
          value={form[name]}
        />
      ))}
      <div
        className={
          isLogInForm || isForgotPassword
            ? "flex items-center justify-between"
            : ""
        }
      >
        <Button
          text={isLoading ? btnLoadingtTxt : btnTxt}
          submit={true}
          isLoading={isLoading}
        />
        {isLogInForm && forgotPassword}
        {isForgotPassword && backToLogIn}
      </div>
    </form>
  );

  const statusMsg = (
    <>
      {!status.error && status.message === "Email successfully sent." && (
        <Message successMsg={status.message.toString()} />
      )}
      {status.error && <Message errorMsg={status.message.toString()} />}
    </>
  );

  return (
    <div className="m-auto text-center py-10">
      {statusMsg}
      <div className="mx-auto flex flex-col gap-5 w-80">
        {formTitle}
        {formComponent}
        {callToAction && (
          <AccountCTA action={callToAction} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}
