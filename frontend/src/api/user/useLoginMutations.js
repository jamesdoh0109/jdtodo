import { useMutateData } from "hooks/useDataOperations";
import { authActions } from "store/reducers/auth";
import { onErrorAfterSubmit } from "util/form";

export const useLoginMutation = (dispatch, setStatus) => {
  const requestConfig = {
    url: "/api/login",
    method: "POST",
  };

  return useMutateData(requestConfig, {
    onSuccess: () => dispatch(authActions.authenticateUser()),
    onError: (error) => onErrorAfterSubmit(error, setStatus),
  });
}