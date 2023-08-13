import { useSelector } from "react-redux";
import {
  passwordConfirmValidator,
  passwordNewValidator,
  passwordValidator,
} from "../../util/validator";
import { useMutateData } from "../../hooks/useDataOperations";
import * as yup from "yup";
import AccountForm from "./form/AccountForm";
import AccountFormTitle from "./form/AccountFormTitle";
import useStatus from "../../hooks/useStatus";
import { onErrorAfterSubmit } from "../../util/form";

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

export default function ChangePassword() {
  const id = useSelector((state) => state.userData.id);

  const { status, setStatus } = useStatus();

  const requestConfig = {
    url: `/api/change_password/${id}`,
    method: "PATCH",
  };

  const { mutate: onChangePassword, isLoading } = useMutateData(requestConfig, {
    onSuccess: () =>
      setStatus({ error: false, message: "Successfully updated!" }),
    onError: (error) => onErrorAfterSubmit(error, setStatus),
  });

  const schemaObj = {
    passwordCurrent: passwordValidator,
    passwordNew: passwordNewValidator,
    passwordConfirm: passwordConfirmValidator([
      yup.ref("passwordNew"),
      "",
      null,
    ]),
  };

  return (
    <>
      <AccountFormTitle title="Change Password" />
      <AccountForm
        submit={onChangePassword}
        formInputs={passwordInputs}
        status={status}
        isLoading={isLoading}
        btnTxt="Save changes"
        btnDisabledTxt="Saving changes"
        schemaObj={schemaObj}
      />
    </>
  );
}
