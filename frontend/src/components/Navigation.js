import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { Navbar } from "flowbite-react";

export default function Navigation() {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    authCtx.setToken(null);
    navigate('/')
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
      >
        Log Out
      </button>
    </Navbar.Collapse>
  );

  return (
    <Navbar fluid={true} rounded={true}>
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

// <nav
//       className="bg-slate-200 border-gray-200 px-2 sm:px-4 py-1 rounded dark:bg-gray-900"
//       style={{ position: "fixed", width: "100%" }}
//     >
//       <div className="container flex flex-wrap items-center justify-between mx-auto">
//         <Link to={token ? "/dashboard" : "/"} className="flex items-center">
//           <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
//             JDTodo
//           </span>
//         </Link>
//         <button
//           data-collapse-toggle="navbar-default"
//           type="button"
//           className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//           aria-controls="navbar-default"
//           aria-expanded="false"
//         >
//           <span className="sr-only">Open main menu</span>
//           <svg
//             className="w-6 h-6"
//             aria-hidden="true"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               fillRule="evenodd"
//               d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
//               clipRule="evenodd"
//             ></path>
//           </svg>
//         </button>
//         <div className="hidden w-full md:block md:w-auto" id="navbar-default">
//           {token ? loggedInOptions : loggedOutOptions}
//         </div>
//       </div>
//     </nav>
