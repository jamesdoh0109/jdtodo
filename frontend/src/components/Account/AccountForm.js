import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDataActions } from "../../store/reducers/user-data";
import { prepareForm, trimFormTrailingSpaces } from "../../util/form";
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

  const handleOnChange = (e) => {
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  };

  const handleResponse = async (res) => {
    const formattedForm = trimFormTrailingSpaces(form)
    if (res.status === 200) {
      if (isEditProfileForm) {
        dispatch(userDataActions.setFirstname({ firstname: formattedForm.firstname }));
        dispatch(userDataActions.setLastname({ lastname: formattedForm.lastname }));
        dispatch(userDataActions.setEmail({ email: formattedForm.email }));
        localStorage.setItem("user", JSON.stringify({ ...formattedForm, id: id }));
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
    setForm(formattedForm)
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const inputError = checkForInputErrors(form);
    if (inputError) {
      setStatus({ error: true, message: inputError });
    } else {
      submitForm();
    }
  };

  const submitForm = () => {
    const endpoint = `/api/user/${id}${
      isEditProfileForm ? "/details" : "/password"
    }`;
    const requestConfig = {
      url: endpoint,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(trimFormTrailingSpaces(form)),
    };
    fetchData(requestConfig, undefined, handleResponse);
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
        <div key={name}>
          <label htmlFor={name}>{label}</label>
          <Input
            id={name}
            type={type}
            name={name}
            onChange={handleOnChange}
            value={form[name]}
          />
        </div>
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
