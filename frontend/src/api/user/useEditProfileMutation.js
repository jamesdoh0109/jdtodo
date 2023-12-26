import { useMutateData } from "hooks/useDataOperations";
import { onErrorAfterSubmit } from "util/form";

export const useEditProfileMutation = (queryClient, id, setStatus) => {
  const requestConfig = {
    url: `/api/user/${id}`,
    method: "PATCH",
  };

  return useMutateData(requestConfig, {
    onSuccess: (data) => {
      setStatus({ error: false, message: "Successfully updated!" });
      queryClient.setQueryData(["user"], data.user);
    },
    onError: (error) => onErrorAfterSubmit(error, setStatus),
  });
};
