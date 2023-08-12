import { emailValidator } from "../util/validator";
import useFetch from "../hooks/useFetch";
import AuthNavigation from "../components/Auth/AuthNavigation";
import AuthFormTitle from "../components/Auth/form/AuthFormTitle";
import AuthForm from "../components/Auth/form/AuthForm";

const forgotPasswordInput = [
  {
    name: "email",
    type: "text",
    placeholder: "Email",
    id: "email",
  },
];

export default function ForgotPassword() {
  const { status, setStatus, isLoading, fetchData } = useFetch();

  const schemaObj = {
    email: emailValidator,
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
        setStatus({
          error: false,
          message: data.message,
        });
      }
    } catch (e) {
      setStatus({ error: true, message: e });
    }
  };

  return (
    <div className="m-auto text-center py-10">
      <div className="mx-auto flex flex-col gap-5 w-80">
        <AuthFormTitle title="Forgot Password" />
        <AuthForm
          formInputs={forgotPasswordInput}
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
          requestURL="/api/forgot_password"
          requestMethod="POST"
          btnTxt="Submit"
          btnDisabledTxt="Submitting"
          schemaObj={schemaObj}
        />
      </div>
    </div>
  );
}
