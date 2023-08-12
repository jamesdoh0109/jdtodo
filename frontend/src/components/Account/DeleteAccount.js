import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../util/auth";
import useFetch from "../../hooks/useFetch";
import AccountFormTitle from "./form/AccountFormTitle";
import ButtonOnClick from "../common/Button/ButtonOnClick";

export default function DeleteAccount() {
  const id = useSelector((state) => state.userData.id);
  const firstname = useSelector((state) => state.userData.firstname);
  const lastname = useSelector((state) => state.userData.lastname);
  const fullname = `${firstname} ${lastname}`;
  const token = useSelector((state) => state.auth.token);

  const { isLoading, fetchData } = useFetch();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    const requestConfig = {
      url: "/api/user/" + id,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    };
    fetchData(requestConfig, undefined, () => logout(dispatch, navigate));
  };

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
          onClick={handleDeleteAccount}
          disabled={isLoading}
        />
      </div>
    </>
  );
}
