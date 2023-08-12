import { useDispatch, useSelector } from "react-redux";
import { userDataActions } from "../../store/reducers/userData";
import AccountForm from "./form/AccountForm";
import AccountFormTitle from "./form/AccountFormTitle";
import useFetch from "../../hooks/useFetch";
import {
  emailValidator,
  firstnameValidator,
  lastnameValidator,
} from "../../util/validator";

export default function EditProfile() {
  const firstname = useSelector((state) => state.userData.firstname);
  const lastname = useSelector((state) => state.userData.lastname);
  const email = useSelector((state) => state.userData.email);
  const id = useSelector((state) => state.userData.id);

  const { status, setStatus, isLoading, fetchData } = useFetch();

  const dispatch = useDispatch();

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
  }

  const handleResponse = async (res) => {
    try {
      const data = await res.json();
      if (res.status === 200) {
        dispatch(
          userDataActions.setFirstname({ firstname: data.user.firstname })
        );
        dispatch(userDataActions.setLastname({ lastname: data.user.lastname }));
        dispatch(userDataActions.setEmail({ email: data.user.email }));
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
      <AccountFormTitle title="Edit Profile" />
      <AccountForm
        formInputs={editProfileInputs}
        fetchData={fetchData}
        handleResponse={handleResponse}
        status={status}
        isLoading={isLoading}
        requestURL={`/api/user/${id}`}
        requestMethod="PATCH"
        btnTxt="Save Changes"
        btnDisabledTxt="Saving Changes"
        schemaObj={schemaObj}
      />
    </>
  );
}
