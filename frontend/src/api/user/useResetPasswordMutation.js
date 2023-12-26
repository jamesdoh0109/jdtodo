import { useMutateData } from "hooks/useDataOperations";
import { onErrorAfterSubmit } from "util/form";

export const useResetPasswordMutation = (
  resetPasswordToken,
  navigate,
  setStatus
) => {
  const requestConfig = {
    url: `/api/reset_password/${resetPasswordToken}`,
    method: "PATCH",
  };

  return useMutateData(requestConfig, {
    onSuccess: () => navigate("/login"),
    onError: (error) => onErrorAfterSubmit(error, setStatus),
  });
};
