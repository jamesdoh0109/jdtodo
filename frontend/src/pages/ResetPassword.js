import AuthForm from "../components/Auth/AuthForm";
import { useParams } from "react-router-dom";

const resetPasswordInput = [
  {
    name: "password",
    type: "password",
    placeholder: "New password",
  },
  {
    name: "password2",
    type: "password",
    placeholder: "Verify new password",
  },
];

export default function ResetPassword() {
  const token = useParams().token;

  return (
    <AuthForm
      title="Reset Password"
      formInputs={resetPasswordInput}
      btnTxt="Submit"
      btnLoadingtTxt="Submitting..."
      resetPasswordToken={token}
    />
  );
}
