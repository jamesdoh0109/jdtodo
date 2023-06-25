import AuthForm from "../components/Auth/AuthForm";

const signUpInputs = [
  {
    name: "firstname",
    type: "text",
    placeholder: "First name",
  },
  {
    name: "lastname",
    type: "text",
    placeholder: "Last name",
  },
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
  {
    name: "password2",
    type: "password",
    placeholder: "Verify password",
  },
];

export default function Signup() {
  return (
    <AuthForm
      title="Sign Up"
      formInputs={signUpInputs}
      btnTxt="Sign up"
      btnLoadingtTxt="Signing up..."
      callToAction="Log in"
    />
  );
}
