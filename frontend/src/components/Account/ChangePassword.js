import {
  passwordConfirmValidator,
  createPasswordValidator,
  passwordValidator,
} from "util/validator";
import { onErrorAfterSubmit } from "util/form";
import { useMutateData } from "hooks/useDataOperations";
import * as yup from "yup";
import AccountForm from "components/Account/AccountForm";
import useStatus from "hooks/useStatus";

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

export default function ChangePassword({ user }) {
  const id = user;

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
    passwordNew: createPasswordValidator,
    passwordConfirm: passwordConfirmValidator([
      yup.ref("passwordNew"),
      "",
      null,
    ]),
  };

  return (
    <>
      <h1 className="text-2xl font-medium">Change Password</h1>
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
