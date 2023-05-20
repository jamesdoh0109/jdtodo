import AuthForm from "../components/Auth/AuthForm";

const logInInputs = [
  {
    name: "email",
    type: "text",
    placeholder: "Email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
  },
];

export default function Login() {
  return (
    <AuthForm
      title="Log In"
      formInputs={logInInputs}
      btnTxt="Log in"
      btnLoadingtTxt="Logging in..."
      callToAction="Sign up"
    />
  );
}
