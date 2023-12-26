import { useQueryData } from "hooks/useDataOperations";

export const useAccountQuery = () => {
  const requestConfig = {
    url: "/api/user",
  };

  return useQueryData(requestConfig, ["user"], (data) => data.user);
};
