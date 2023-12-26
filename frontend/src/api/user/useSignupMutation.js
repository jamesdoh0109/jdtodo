import { useMutateData } from "hooks/useDataOperations";
import { onErrorAfterSubmit } from "util/form";

export const useSignupMutation = (navigate, setStatus) => {
  const requestConfig = {
    url: "/api/signup",
    method: "POST",
  };

  return useMutateData(requestConfig, {
    onSuccess: () => navigate("/login"),
    onError: (error) => onErrorAfterSubmit(error, setStatus),
  });
};
