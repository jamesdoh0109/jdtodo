import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../util/auth";
import { Navbar } from "flowbite-react";

export default function Navigation() {
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(dispatch, navigate);
  };

  const loggedOutOptions = (
    <Navbar.Collapse>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Log In</NavLink>
      <NavLink to="/signup">Sign Up</NavLink>
    </Navbar.Collapse>
  );

  const loggedInOptions = (
    <Navbar.Collapse>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/account">Account</NavLink>
      <NavLink onClick={handleLogout} to="/">
        Log Out
      </NavLink>
    </Navbar.Collapse>
  );

  return (
    <Navbar
      fluid={true}
      rounded={true}
      className="fixed w-full"
      style={{ backgroundColor: "rgb(226 232 240)" }} 
    >
      <NavLink to={token ? "/dashboard" : "/"}>
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white ml-3">
          JDTodo
        </span>
      </NavLink>
      <Navbar.Toggle />
      {token ? loggedInOptions : loggedOutOptions}
    </Navbar>
  );
}
