import { useMutateData } from "hooks/useDataOperations";
import { authActions } from "store/reducers/auth";
import { onErrorAfterSubmit } from "util/form";

export const useDeleteAccountMutation = (
  queryClient,
  dispatch,
  setStatus,
  id
) => {
  const requestConfig = {
    url: "/api/user/" + id,
    method: "DELETE",
  };

  return useMutateData(requestConfig, {
    onSuccess: () => {
      dispatch(authActions.deauthenticateUser());
      queryClient.clear();
    },
    onError: (error) => onErrorAfterSubmit(error, setStatus),
  });
};
