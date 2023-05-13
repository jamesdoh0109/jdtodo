import { useState, useEffect } from "react";
import UserDataContext from "./user-data-context";

export default function UserDataProvider({ children }) {
  const [id, setId] = useState(-1);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [projects, setProjects] = useState(null);

  console.log(id + " " + fullname + " " + email + " " + projects)

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const formattedUser = JSON.parse(user)
      setId(formattedUser.id);
      setFullname(formattedUser.name);
      setEmail(formattedUser.email);
      setProjects(formattedUser.projects);
    }
  }, []);

  return (
    <UserDataContext.Provider
      value={{
        id: id,
        fullname: fullname,
        email: email,
        projects: projects,
        setId: setId,
        setFullname: setFullname,
        setEmail: setEmail,
        setProjects: setProjects,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}
