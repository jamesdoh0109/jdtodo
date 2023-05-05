import { createContext } from "react";

const AuthContext = createContext({
  token: null,
  setToken: token => {}
});

export default AuthContext;