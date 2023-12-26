import { useMutateData } from "hooks/useDataOperations";
import { onErrorAfterSubmit } from "util/form";

export const useForgotPassword = (setStatus) => {
  const requestConfig = {
    url: "/api/forgot_password",
    method: "POST",
  };

  return useMutateData(requestConfig, {
    onSuccess: () =>
      setStatus({ error: false, message: "Email successfully sent!" }),
    onError: (error) => onErrorAfterSubmit(error, setStatus),
  });
};
