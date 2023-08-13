import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../util/auth";
import AccountFormTitle from "./form/AccountFormTitle";
import ButtonOnClick from "../common/Button/ButtonOnClick";
import { useMutateData } from "../../hooks/useDataOperations";
import { authActions } from "../../store/reducers/auth";

export default function DeleteAccount() {
  const id = useSelector((state) => state.userData.id);
  const firstname = useSelector((state) => state.userData.firstname);
  const lastname = useSelector((state) => state.userData.lastname);
  const fullname = `${firstname} ${lastname}`;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const requestConfig = {
    url: "/api/user/" + id,
    method: "DELETE",
  };

  const { mutate: onDeleteAccount, isLoading } = useMutateData(requestConfig, {
    onSuccess: () => {
      dispatch(authActions.onLogout());
      logout(dispatch, navigate);
    },
  });

  return (
    <>
      <AccountFormTitle title="Delete Account" />
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
      </div>
    </>
  );
}
