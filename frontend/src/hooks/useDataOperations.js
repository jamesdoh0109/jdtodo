import { useMutation, useQuery } from "@tanstack/react-query";
import { trimFormTrailingSpaces } from "../util/form";

const BASE_URL =
  "https://jihundoh0109-stunning-guide-7j7xq64644p2xrpx-5000.app.github.dev";

export const useQueryData = (requestConfig, key, select) => {
  const queryData = async () => {
    const res = await fetch(BASE_URL + requestConfig.url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });
    const json = await res.json();
    const formattedJson = select(json);
    return formattedJson;
  };
  return useQuery(key, queryData, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useMutateData = (requestConfig, sideEffect) => {
  const mutateData = async (data) => {
    const res = await fetch(BASE_URL + requestConfig.url, {
      method: requestConfig.method,
      body: data && JSON.stringify(trimFormTrailingSpaces(data)),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });
    const json = await res.json();
    if (res.status !== 200 && res.status !== 201) {
      throw new Error(json.error)
    }
    return json;
  };
  return useMutation((data) => mutateData(data), {
    onSuccess: sideEffect.onSuccess,
    onMutate: sideEffect.onMutate,
    onError: sideEffect.onError,
    onSettled: sideEffect.onSettled,
  });
};
