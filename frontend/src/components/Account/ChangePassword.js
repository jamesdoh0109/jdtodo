import { useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import Button from "../common/Button";
import Input from "../common/Input";
import Message from "../common/Message";

export default function ChangePassword() {
  const id = useSelector((state) => state.userData.id);
  const token = useSelector((state) => state.auth.token);

  const { isLoading, status, setStatus, fetchData } = useFetch();

  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setPasswordInfo((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveResponse = async (res) => {
    if (res.status === 200) {
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

  const handleChangePassword = (e) => {
    e.preventDefault();
    const requestConfig = {
      url: "/api/user/" + id + "/password",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(passwordInfo),
    };
    fetchData(requestConfig, handleSaveResponse);
  };

  return (
    <>
      {!status.error && status.message === "Successfully updated!" && (
        <Message successMsg={status.message} />
      )}
      {status.error && <Message errorMsg={status.message} />}
      <h1 className="text-2xl font-medium">Change Password</h1>
      <form className="pt-7 pb-8 mb-4" onSubmit={handleChangePassword}>
        <label htmlFor="current-password">Current password</label>
        <Input
          id="current-password"
          name="currentPassword"
          type="password"
          onChange={handleInputChange}
          value={passwordInfo.currentPassword}
        />
        <label htmlFor="new-password">New password</label>
        <Input
          id="new-password"
          name="newPassword"
          type="password"
          onChange={handleInputChange}
          value={passwordInfo.newPassword}
        />
        <label htmlFor="confirm-password">Confirm new password</label>
        <Input
          id="confirm-password"
          name="confirmPassword"
          type="password"
          onChange={handleInputChange}
          value={passwordInfo.confirmPassword}
        />
        <Button
          text={isLoading ? "Saving changes..." : "Change password"}
          submit={true}
          isLoading={isLoading}
        />
      </form>
    </>
  );
}
