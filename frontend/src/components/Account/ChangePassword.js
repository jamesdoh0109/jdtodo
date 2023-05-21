import { AccountForm } from "./AccountForm";

export default function ChangePassword() {
  const passwordInputs = [
    {
      name: "currentPassword",
      label: "Current password",
      type: "password",
      id: "current-password",
    },
    {
      name: "newPassword",
      label: "New password",
      type: "password",
      id: "new-password",
    },
    {
      name: "confirmPassword",
      label: "Confirm new password",
      type: "password",
      id: "confirm-password",
    },
  ];

  return <AccountForm title="Change Password" formInputs={passwordInputs} />;
}
