import { useNavigate, useParams } from "react-router-dom";
import {
  passwordConfirmValidator,
  passwordNewValidator,
} from "../util/validator";
import { useMutateData } from "../hooks/useDataOperations";
import * as yup from "yup";
import useStatus from "../hooks/useStatus";
import AuthFormTitle from "../components/Auth/form/AuthFormTitle";
import AuthForm from "../components/Auth/form/AuthForm";
import { onErrorAfterSubmit } from "../util/form";

const resetPasswordInput = [
  {
    name: "password",
    type: "password",
    placeholder: "New password",
    id: "password",
  },
  {
    name: "passwordConfirm",
    type: "password",
    placeholder: "Verify new password",
    id: "passwordConfirm",
  },
];

export default function ResetPassword() {
  const navigate = useNavigate();

  const token = useParams().token;

  const { status, setStatus } = useStatus();

  const requestConfig = {
    url: `/api/reset_password/${token}`,
    method: "PATCH",
  };

  const { mutate: onResetPassword, isLoading } = useMutateData(requestConfig, {
    onSuccess: () => navigate("/login"),
    onError: (error) => onErrorAfterSubmit(error, setStatus),
  });

  const schemaObj = {
    password: passwordNewValidator,
    passwordConfirm: passwordConfirmValidator([yup.ref("password"), "", null]),
  };

  return (
    <div className="m-auto text-center py-10">
      <div className="mx-auto flex flex-col gap-5 w-80">
        <AuthFormTitle title="Reset Password" />
        <AuthForm
          submit={onResetPassword}
          formInputs={resetPasswordInput}
          status={status}
          isLoading={isLoading}
          btnTxt="Submit"
          btnDisabledTxt="Submitting"
          schemaObj={schemaObj}
        />
      </div>
    </div>
  );
}
