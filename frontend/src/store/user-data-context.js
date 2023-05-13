import { createContext } from "react";

const UserDataContext = createContext({
  id: -1,
  fullname: "",
  email: "",
  projects: null,
  setId: id => {},
  setFullname: fullname => {},
  setEmail: email => {},
  setProjects: projects => {}
})

export default UserDataContext;