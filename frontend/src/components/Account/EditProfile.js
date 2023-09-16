import { useQueryClient } from "@tanstack/react-query";
import {
  emailValidator,
  firstnameValidator,
  lastnameValidator,
} from "util/validator";
import { useMutateData } from "hooks/useDataOperations";
import { onErrorAfterSubmit } from "util/form";
import useStatus from "hooks/useStatus";
import AccountForm from "components/Account/AccountForm";

export default function EditProfile({ user }) {
  const { id, email, firstname, lastname } = user;

  const queryClient = useQueryClient();

  const editProfileInputs = [
    {
      name: "firstname",
      label: "First name",
      type: "text",
      id: "firstname",
      value: firstname,
    },
    {
      name: "lastname",
      label: "Last name",
      type: "text",
      id: "lastname",
      value: lastname,
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      id: "email",
      value: email,
    },
  ];

  const schemaObj = {
    firstname: firstnameValidator,
    lastname: lastnameValidator,
    email: emailValidator,
  };

  const { status, setStatus } = useStatus();

  const requestConfig = {
    url: `/api/user/${id}`,
    method: "PATCH",
  };

  const { mutate: onEditProfile, isLoading } = useMutateData(requestConfig, {
    onSuccess: (data) => {
      setStatus({ error: false, message: "Successfully updated!" });
      queryClient.setQueryData(["user"], data.user);
    },
    onError: (error) => onErrorAfterSubmit(error, setStatus),
  });

  return (
    <>
      <h1 className="text-2xl font-medium">Edit Profile</h1>
      <AccountForm
        submit={onEditProfile}
        formInputs={editProfileInputs}
        status={status}
        isLoading={isLoading}
        btnTxt="Save Changes"
        btnDisabledTxt="Saving Changes"
        schemaObj={schemaObj}
      />
    </>
  );
}
