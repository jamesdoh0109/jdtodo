import { useMutateData } from "hooks/useDataOperations";
import { onErrorAfterSubmit } from "util/form";

export const useChangePasswordMutation = (id, setStatus) => {
  const requestConfig = {
    url: `/api/change_password/${id}`,
    method: "PATCH",
  };

  return useMutateData(requestConfig, {
    onSuccess: () =>
      setStatus({ error: false, message: "Successfully updated!" }),
    onError: (error) => onErrorAfterSubmit(error, setStatus),
  });
};
