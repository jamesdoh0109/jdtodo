import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteAccountMutation } from "api/user/useDeleteAccountMutation";
import useStatus from "hooks/useStatus";
import ButtonOnClick from "components/common/Button/ButtonOnClick";
import Message from "components/common/Message";

export default function DeleteAccount({ user }) {
  const { id, firstname, lastname } = user;
  const fullname = `${firstname} ${lastname}`;

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { status, setStatus } = useStatus();

  const { mutate: onDeleteAccount, isLoading } = useDeleteAccountMutation(
    queryClient,
    dispatch,
    setStatus,
    id
  );

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
          color="red"
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
