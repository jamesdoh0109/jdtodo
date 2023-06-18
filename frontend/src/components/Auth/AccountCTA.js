import { Link } from "react-router-dom";

export default function AccountCTA({ action, isLoading }) {
  return (
    <p className="text-center text-gray-500 text-xs">
      {action === "Log in" && "Already have an account?\u00A0"}
      {action === "Sign up" && "Don't have an account?\u00A0"}
      <Link
        to={"/" + action.replace(/\s/g, "").toLowerCase()}
        className={`text-blue-500 ${isLoading && "pointer-events-none"}`}
      >
        {action}
      </Link>
    </p>
  );
}
