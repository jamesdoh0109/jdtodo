import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, checkForInputErrors } from "../../util/auth";
import { prepareForm } from "../../util/form";
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
}) {
  const [form, setForm] = useState(prepareForm(formInputs));

  const { isLoading, status, setStatus, fetchData } = useFetch();

  const isLogInForm = title === "Log In";

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
        setStatus({ error: true, message: data.error });
      } else if (res.status === 200) {
        login(dispatch, navigate, data);
      } else if (res.status === 201) {
        navigate("/login");
      }
    } catch (e) {
      setStatus({ error: true, message: e });
    }
  };

  const submitForm = async () => {
    const endpoint = `/api/${title.replace(/\s/g, "").toLowerCase()}`;
    const requestConfig = {
      url: endpoint,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    };
    fetchData(requestConfig, handleResponse);
  };

  const formTitle = (
    <div className="title">
      <h1 className="text-5xl font-bold">{title}</h1>
    </div>
  );

  const forgotPassword = (
    <Link
      className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
      to={"/"}
    >
      Forgot Password?
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
      <div className={isLogInForm ? "flex items-center justify-between" : ""}>
        <Button
          text={isLoading ? btnLoadingtTxt : btnTxt}
          submit={true}
          isLoading={isLoading}
        />
        {isLogInForm && forgotPassword}
      </div>
    </form>
  );

  return (
    <div className="m-auto text-center py-10">
      {status.error && <Message errorMsg={status.message.toString()} />}
      <div className="mx-auto flex flex-col gap-5 w-80">
        {formTitle}
        {formComponent}
        <AccountCTA action={callToAction} />
      </div>
    </div>
  );
}
