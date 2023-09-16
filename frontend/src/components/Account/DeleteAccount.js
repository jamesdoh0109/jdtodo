import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { useMutateData } from "hooks/useDataOperations";
import { authActions } from "store/reducers/auth";
import { onErrorAfterSubmit } from "util/form";
import useStatus from "hooks/useStatus";
import ButtonOnClick from "components/common/Button/ButtonOnClick";
import Message from "components/common/Message";

export default function DeleteAccount({ user }) {
  const { id, firstname, lastname } = user;
  const fullname = `${firstname} ${lastname}`;

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { status, setStatus } = useStatus();

  const requestConfig = {
    url: "/api/user/" + id,
    method: "DELETE",
  };

  const { mutate: onDeleteAccount, isLoading } = useMutateData(requestConfig, {
    onSuccess: () => {
      dispatch(authActions.deauthenticateUser());
      queryClient.clear();
    },
    onError: (error) => onErrorAfterSubmit(error, setStatus),
  });

  return (
    <>
      <h1 className="text-2xl font-medium">Delete Account</h1>
      <p className="pt-7 pb-8">
        Hello <span className="font-bold inline">{fullname}</span>
        !
        <br />
        <br />
        We are sorry to hear that you would like to delete your account. Please
        confirm below to make sure this is the action you want to take.
      </p>
      <div>
        <ButtonOnClick
          text={isLoading ? "Deleting" : "Confirm"}
          onClick={() => onDeleteAccount()}
          disabled={isLoading}
        />
        <Message
          messageObj={{
            message: status.message.toString(),
            error: status.error,
          }}
        />
      </div>
    </>
  );
}
