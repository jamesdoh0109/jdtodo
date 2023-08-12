import { useNavigate, useParams } from "react-router-dom";
import { passwordConfirmValidator, passwordNewValidator } from "../util/validator";
import * as yup from "yup";
import useFetch from "../hooks/useFetch";
import AuthFormTitle from "../components/Auth/form/AuthFormTitle";
import AuthForm from "../components/Auth/form/AuthForm";


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

  const { status, setStatus, isLoading, fetchData } = useFetch();

  const schemaObj = {
    password: passwordNewValidator,
    passwordConfirm: passwordConfirmValidator([yup.ref('password'), "", null]),
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
        navigate("/login");
      }
    } catch (e) {
      setStatus({ error: true, message: e });
    }
  };

  return (
    <div className="m-auto text-center py-10">
      <div className="mx-auto flex flex-col gap-5 w-80">
        <AuthFormTitle title="Reset Password" />
        <AuthForm
          formInputs={resetPasswordInput}
          fetchData={fetchData}
          handleResponse={handleResponse}
          status={status}
          isLoading={isLoading}
          requestURL={`/api/reset_password/${token}`}
          requestMethod="PATCH"
          btnTxt="Submit"
          btnDisabledTxt="Submitting"
          schemaObj={schemaObj}
        />
      </div>
    </div>
  );
}
