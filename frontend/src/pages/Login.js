import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../util/auth";
import { emailValidator, passwordValidator } from "../util/validator";
import useFetch from "../hooks/useFetch";
import AccountCTA from "../components/Auth/AccountCTA";
import AuthNavigation from "../components/Auth/AuthNavigation";
import AuthFormTitle from "../components/Auth/form/AuthFormTitle";
import AuthForm from "../components/Auth/form/AuthForm";

const loginInputs = [
  {
    name: "email",
    type: "text",
    placeholder: "Email",
    id: "Email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    id: "password",
  },
];

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { status, setStatus, isLoading, fetchData } = useFetch();

  const schemaObj = {
    email: emailValidator,
    password: passwordValidator,
  };

  const handleResponse = async (res) => {
    try {
      const data = await res.json();
      if (res.status !== 200) {
        setStatus({
          error: true,
          message: data.error,
        });
      } else {
        login(dispatch, navigate, data);
      }
    } catch (e) {
      setStatus({ error: true, message: e });
    }
  };

  return (
    <div className="m-auto text-center py-10">
      <div className="mx-auto flex flex-col gap-5 w-80">
        <AuthFormTitle title="Log In" />
        <AuthForm
          formInputs={loginInputs}
          fetchData={fetchData}
          handleResponse={handleResponse}
          status={status}
          additionalAction={
            <AuthNavigation
              action="Forgot Password?"
              link="/forgot-password"
              isLoading={isLoading}
            />
          }
          isLoading={isLoading}
          requestURL="/api/login"
          requestMethod="POST"
          btnTxt="Log In"
          btnDisabledTxt="Logging In"
          schemaObj={schemaObj}
        />
        <AccountCTA action="Sign up" disabled={isLoading} />
      </div>
    </div>
  );
}
