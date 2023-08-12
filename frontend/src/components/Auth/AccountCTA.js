import { Link } from "react-router-dom";

export default function AccountCTA({ action, disabled }) {
  return (
    <p className="text-center text-gray-500 text-xs">
      {action === "Log in" && "Already have an account?\u00A0"}
      {action === "Sign up" && "Don't have an account?\u00A0"}
      <Link
        to={"/" + action.replace(/\s/g, "").toLowerCase()}
        className={`${disabled ? "pointer-events-none text-blue-300" : "text-blue-500"}`}
      >
        {action}
      </Link>
    </p>
  );
}
