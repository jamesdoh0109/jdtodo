import { useMutateData } from "hooks/useDataOperations";
import { authActions } from "store/reducers/auth";

export const useLogoutMutation = (queryClient, dispatch) => {
  const requestConfig = {
    url: "/api/logout",
    method: "POST",
  };

  return useMutateData(requestConfig, {
    onSuccess: () => {
      dispatch(authActions.deauthenticateUser());
      queryClient.clear();
    },
  });
};
