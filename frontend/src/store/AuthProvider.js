import { useEffect, useState } from "react";
import AuthContext from "./auth-context";

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  console.log(token)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  return(
    <AuthContext.Provider 
      value={{
        token: token,
        setToken: setToken
      }}
    >
      {children}
    </AuthContext.Provider>
  )
} 