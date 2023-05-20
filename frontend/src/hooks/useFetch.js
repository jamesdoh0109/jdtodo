import { useState } from "react";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [status, setStatus] = useState({
    error: false,
    message: "request not made yet.",
  });

  const fetchData = async (requestConfig, applyData) => {
    setIsLoading(true);
    try {
      const res = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        body: requestConfig.body ? requestConfig.body : null,
        headers: requestConfig.headers ? requestConfig.headers : {},
      });
      applyData(res);
    } catch (e) {
      setStatus({ error: true, message: e });
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    status,
    setStatus,
    fetchData,
  };
};

export default useFetch;
