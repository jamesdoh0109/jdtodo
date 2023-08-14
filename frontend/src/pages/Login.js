import { useDispatch } from "react-redux";
import { authActions } from "../store/reducers/auth";
import { useMutateData } from "../hooks/useDataOperations";
import { login } from "../util/auth";
import { onErrorAfterSubmit } from "../util/form";
import { emailValidator, passwordValidator } from "../util/validator";
import useStatus from "../hooks/useStatus";
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
  const dispatch = useDispatch();

  const { status, setStatus } = useStatus();

  const requestConfig = {
    url: "/api/login",
    method: "POST",
  };

  const { mutate: onLogin, isLoading } = useMutateData(requestConfig, {
    onSuccess: (data) => {
      dispatch(authActions.authenticateUser());
      login(dispatch, data);
    },
    onError: (error) => onErrorAfterSubmit(error, setStatus),
  });

  const schemaObj = {
    email: emailValidator,
    password: passwordValidator,
  };

  return (
    <div className="m-auto text-center py-10">
      <div className="mx-auto flex flex-col gap-5 w-80">
        <AuthFormTitle title="Log In" />
        <AuthForm
          submit={onLogin}
          formInputs={loginInputs}
          status={status}
          isLoading={isLoading}
          additionalAction={
            <AuthNavigation
              action="Forgot Password?"
              link="/forgot-password"
              isLoading={isLoading}
            />
          }
          btnTxt="Log In"
          btnDisabledTxt="Logging In"
          schemaObj={schemaObj}
        />
        <AccountCTA action="Sign up" disabled={isLoading} />
      </div>
    </div>
  );
}
