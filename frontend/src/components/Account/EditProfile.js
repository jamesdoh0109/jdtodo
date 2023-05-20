import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDataActions } from "../../store/reducers/user-data";
import { checkForInputErrors } from "../../util/auth";
import useFetch from "../../hooks/useFetch";
import Button from "../common/Button";
import Input from "../common/Input";
import Message from "../common/Message";

export default function EditProfile() {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.userData.id);
  const firstname = useSelector((state) => state.userData.firstname);
  const lastname = useSelector((state) => state.userData.lastname);
  const email = useSelector((state) => state.userData.email);

  const token = useSelector((state) => state.auth.token);

  const [newUserData, setNewUserData] = useState({
    firstname: firstname,
    lastname: lastname,
    email: email,
  });

  const { isLoading, status, setStatus, fetchData } = useFetch();

  const handleInputChange = (e) => {
    setNewUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const preEditCheck = () => {
    const editUserError = checkForInputErrors(newUserData);
    if (editUserError) {
      setStatus({ error: true, message: editUserError });
    }
  };

  const handleEditUser = async (res) => {
    console.log(res)
    if (res.status === 200) {
      dispatch(
        userDataActions.setFirstname({ firstname: newUserData.firstname })
      );
      dispatch(userDataActions.setLastname({ lastname: newUserData.lastname }));
      dispatch(userDataActions.setEmail({ email: newUserData.email }));
      localStorage.setItem("user", JSON.stringify({ ...newUserData, id: id }));
      setStatus({ error: false, message: "Successfully updated!" });
    } else {
      try {
        const data = await res.json();
        setStatus({ error: true, message: data.error });
      } catch (e) {
        setStatus({ error: true, message: e });
      }
    }
  };

  const onSaveChanges = async (e) => {
    e.preventDefault();
    preEditCheck();
    const requestConfig = {
      url: "/api/user/" + id + "/details",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(newUserData),
    };
    fetchData(requestConfig, handleEditUser);
  };

  return (
    <>
      {!status.error && status.message === "Successfully updated!" && (
        <Message successMsg={status.message} />
      )}
      {status.error && <Message errorMsg={status.message} />}
      <h1 className="text-2xl font-medium">Profile</h1>
      <form className="pt-7 pb-8 mb-4" onSubmit={onSaveChanges}>
        <label htmlFor="firstname">First name</label>
        <Input
          id="firstname"
          name="firstname"
          type="text"
          onChange={handleInputChange}
          value={newUserData.firstname}
        />
        <label htmlFor="lastname">Last name</label>
        <Input
          id="lastname"
          name="lastname"
          type="text"
          onChange={handleInputChange}
          value={newUserData.lastname}
        />
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          name="email"
          type="text"
          onChange={handleInputChange}
          value={newUserData.email}
        />
        <Button
          text={isLoading ? "Saving changes..." : "Save changes"}
          submit={true}
          isLoading={isLoading}
        />
      </form>
    </>
  );
}
