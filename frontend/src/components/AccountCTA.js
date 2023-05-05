import { Link } from "react-router-dom";

export default function AccountCTA({ message, href, action }) {
  return (
    <p className="text-center text-gray-500 text-xs">
      {message}
      <Link to={href} style={{ color: "blue" }}>
        {action}
      </Link>
    </p>
  );
}
