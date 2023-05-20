import { Link } from "react-router-dom";

export default function AccountCTA({ action }) {
  return (
    <p className="text-center text-gray-500 text-xs">
      {action === "Log in" ? "Already have an account?\u00A0" : "Don't have an account?\u00A0"}
      <Link to={"/" + action.replace(/\s/g, '').toLowerCase()} style={{ color: "blue" }}>
        {action}
      </Link>
    </p>
  );
}
