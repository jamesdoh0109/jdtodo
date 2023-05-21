import { useState } from "react";
import { useSelector } from "react-redux";
import { AccountForm } from "./AccountForm";

export default function EditProfile() {
  const firstname = useSelector((state) => state.userData.firstname);
  const lastname = useSelector((state) => state.userData.lastname);
  const email = useSelector((state) => state.userData.email);

  const editProfileInputs = [
    {
      name: "firstname",
      label: "First name",
      type: "text",
      value: firstname,
    },
    {
      name: "lastname",
      label: "Last name",
      type: "text",
      value: lastname,
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      value: email,
    },
  ];

  return <AccountForm title="Edit Profile" formInputs={editProfileInputs} />;
}
