import { Link } from "react-router-dom";

export default function AuthNavigation({ action, link, isLoading }) {
  return (
    <Link
      className={`inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 ${
        isLoading ? "pointer-events-none text-blue-300" : "text-blue-500"
      }`}
      to={link}
    >
      {action}
    </Link>
  );
}
