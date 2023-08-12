import { useCallback, useState } from "react";

const useFetch = () => {
  const BASE_URL =
    "https://jihundoh0109-stunning-guide-7j7xq64644p2xrpx-5000.app.github.dev";

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({
    error: false,
    message: "",
  });

  const fetchData = useCallback(
    async (requestConfig, preFetchUpdateUI, applyData) => {
      setIsLoading(true);
      preFetchUpdateUI && preFetchUpdateUI();
      try {
        const res = await fetch(BASE_URL + requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          body: requestConfig.body ? requestConfig.body : null,
          headers: requestConfig.headers ? requestConfig.headers : {},
        });
        applyData && applyData(res);
      } catch (e) {
        setStatus({ error: true, message: e });
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    status,
    setStatus,
    fetchData,
  };
};

export default useFetch;
