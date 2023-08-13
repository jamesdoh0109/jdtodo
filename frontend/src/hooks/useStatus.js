import { useState } from "react";

const useStatus = () => {
  const [status, setStatus] = useState({
    error: false,
    message: "",
  });
  return { status, setStatus };
};

export default useStatus;
