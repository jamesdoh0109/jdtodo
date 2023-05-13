import { Link, useNavigate } from "react-router-dom";
import { logout } from "../util/auth";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "flowbite-react";

export default function Navigation() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(dispatch, navigate);
  };

  const loggedOutOptions = (
    <Navbar.Collapse>
      <Link
        to={"/"}
        className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
      >
        Home
      </Link>
      <Link
        to={"/login"}
        className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
      >
        Log In
      </Link>
      <Link
        to={"/signup"}
        className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
      >
        Sign Up
      </Link>
    </Navbar.Collapse>
  );

  const loggedInOptions = (
    <Navbar.Collapse>
      <Link
        to={"/dashboard"}
        className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
      >
        Dashboard
      </Link>
      <Link
        to={"/account"}
        className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
      >
        Account
      </Link>
      <button
        onClick={handleLogout}
        className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        style={{ textAlign: "left" }}
      >
        Log Out
      </button>
    </Navbar.Collapse>
  );

  return (
    <Navbar
      fluid={true}
      rounded={true}
      style={{
        position: "fixed",
        width: "100%",
        backgroundColor: "rgb(226 232 240)",
      }}
    >
      <Navbar.Brand>
        <Link to={token ? "/dashboard" : "/"} className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            JDTodo
          </span>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
      {token ? loggedInOptions : loggedOutOptions}
    </Navbar>
  );
}
