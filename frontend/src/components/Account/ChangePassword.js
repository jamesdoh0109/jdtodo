import { useSelector } from "react-redux";
import {
  passwordConfirmValidator,
  passwordNewValidator,
  passwordValidator,
} from "../../util/validator";
import * as yup from "yup";
import useFetch from "../../hooks/useFetch";
import AccountForm from "./form/AccountForm";
import AccountFormTitle from "./form/AccountFormTitle";

const passwordInputs = [
  {
    name: "passwordCurrent",
    label: "Current password",
    type: "password",
    id: "password-current",
  },
  {
    name: "passwordNew",
    label: "New password",
    type: "password",
    id: "password-new",
  },
  {
    name: "passwordConfirm",
    label: "Confirm new password",
    type: "password",
    id: "password-confirm",
  },
];

const schemaObj = {
  passwordCurrent: passwordValidator,
  passwordNew: passwordNewValidator,
  passwordConfirm: passwordConfirmValidator([yup.ref("password"), "", null]),
};

export default function ChangePassword() {
  const id = useSelector((state) => state.userData.id);

  const { status, setStatus, isLoading, fetchData } = useFetch();

  const handleResponse = async (res) => {
    try {
      const data = await res.json();
      if (res.status === 200) {
        setStatus({ error: false, message: "Successfully updated!" });
      } else {
        setStatus({ error: true, message: data.error });
      }
    } catch (e) {
      setStatus({ error: true, message: e });
    }
  };

  return (
    <>
      <AccountFormTitle title="Change Password" />
      <AccountForm
        formInputs={passwordInputs}
        fetchData={fetchData}
        handleResponse={handleResponse}
        status={status}
        isLoading={isLoading}
        requestURL={`/api/change_password/${id}`}
        requestMethod="PATCH"
        btnTxt="Save changes"
        btnDisabledTxt="Saving changes"
        schemaObj={schemaObj}
      />
    </>
  );
}
