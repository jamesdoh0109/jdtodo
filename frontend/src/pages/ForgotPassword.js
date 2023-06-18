import AuthForm from "../components/Auth/AuthForm";

const forgotPasswordInput = [
  {
    name: "email",
    type: "text",
    placeholder: "Email",
  },
];

export default function ForgotPassword() {
  return (
    <AuthForm
      title="Forgot Password"
      formInputs={forgotPasswordInput}
      btnTxt="Submit"
      btnLoadingtTxt="Submitting..."
    />
  );
}
