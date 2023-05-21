import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDataActions } from "../../store/reducers/user-data";
import { prepareForm } from "../../util/form";
import { checkForInputErrors } from "../../util/auth";
import useFetch from "../../hooks/useFetch";
import Input from "../common/Input";
import Button from "../common/Button";
import Message from "../common/Message";

export function AccountForm({ title, formInputs }) {
  const id = useSelector((state) => state.userData.id);
  const token = useSelector((state) => state.auth.token);

  const [form, setForm] = useState(prepareForm(formInputs));

  const { isLoading, status, setStatus, fetchData } = useFetch();

  const isEditProfileForm = title === "Edit Profile";

  const dispatch = useDispatch();

  const validateInputs = () => {
    const editUserError = checkForInputErrors(form);
    if (editUserError) {
      setStatus({ error: true, message: editUserError });
    }
  };

  const handleOnChange = (e) => {
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  };

  const handleResponse = async (res) => {
    if (res.status === 200) {
      if (isEditProfileForm) {
        dispatch(userDataActions.setFirstname({ firstname: form.firstname }));
        dispatch(userDataActions.setLastname({ lastname: form.lastname }));
        dispatch(userDataActions.setEmail({ email: form.email }));
        localStorage.setItem("user", JSON.stringify({ ...form, id: id }));
      }
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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    isEditProfileForm && validateInputs();
    const endpoint = `/api/user/${id}${
      isEditProfileForm ? "/details" : "/password"
    }`;
    const requestConfig = {
      url: endpoint,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(form),
    };
    fetchData(requestConfig, handleResponse);
  };

  const statusMsg = (
    <>
      {!status.error && status.message === "Successfully updated!" && (
        <Message successMsg={status.message} />
      )}
      {status.error && <Message errorMsg={status.message} />}
    </>
  );

  const formTitle = <h1 className="text-2xl font-medium">{title}</h1>;

  const formComponent = (
    <form className="pt-7 pb-8 mb-4" onSubmit={handleOnSubmit}>
      {formInputs.map(({ name, label, type }) => (
        <>
          <label htmlFor={name}>{label}</label>
          <Input
            id={name}
            type={type}
            name={name}
            onChange={handleOnChange}
            value={form[name]}
          />
        </>
      ))}
      <Button
        text={isLoading ? "Saving changes..." : "Save changes"}
        submit={true}
        isLoading={isLoading}
      />
    </form>
  );

  return (
    <>
      {statusMsg}
      {formTitle}
      {formComponent}
    </>
  );
}
