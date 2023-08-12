import { useNavigate } from "react-router-dom";
import {
  emailValidator,
  firstnameValidator,
  lastnameValidator,
  passwordConfirmValidator,
  passwordNewValidator,
} from "../util/validator";
import * as yup from "yup";
import useFetch from "../hooks/useFetch";
import AccountCTA from "../components/Auth/AccountCTA";
import AuthNavigation from "../components/Auth/AuthNavigation";
import AuthFormTitle from "../components/Auth/form/AuthFormTitle";
import AuthForm from "../components/Auth/form/AuthForm";

const signUpInputs = [
  {
    name: "firstname",
    type: "text",
    placeholder: "First name",
    id: "firstname",
  },
  {
    name: "lastname",
    type: "text",
    placeholder: "Last name",
    id: "lastname",
  },
  {
    name: "email",
    type: "text",
    placeholder: "Email",
    id: "email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    id: "password",
  },
  {
    name: "passwordConfirm",
    type: "password",
    placeholder: "Verify password",
    id: "password-confirm",
  },
];

export default function Signup() {
  const navigate = useNavigate();

  const { status, setStatus, isLoading, fetchData } = useFetch();

  const schemaObj = {
    firstname: firstnameValidator,
    lastname: lastnameValidator,
    email: emailValidator,
    password: passwordNewValidator,
    passwordConfirm: passwordConfirmValidator([yup.ref("password"), "", null]),
  };

  const handleResponse = async (res) => {
    try {
      const data = await res.json();
      if (res.status !== 201) {
        setStatus({
          error: true,
          message: data.error,
        });
      } else {
        navigate("/login");
      }
    } catch (e) {
      setStatus({ error: true, message: e });
    }
  };

  return (
    <div className="m-auto text-center py-10">
      <div className="mx-auto flex flex-col gap-5 w-80">
        <AuthFormTitle title="Sign Up" />
        <AuthForm
          formInputs={signUpInputs}
          fetchData={fetchData}
          handleResponse={handleResponse}
          status={status}
          additionalAction={
            <AuthNavigation
              action="Back to login"
              link="/login"
              isLoading={isLoading}
            />
          }
          isLoading={isLoading}
          requestURL="/api/signup"
          requestMethod="POST"
          btnTxt="Sign Up"
          btnDisabledTxt="Signing In"
          schemaObj={schemaObj}
        />
        <AccountCTA action="Log in" disabled={isLoading} />
      </div>
    </div>
  );
}
