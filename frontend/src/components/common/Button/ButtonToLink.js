import { Link } from "react-router-dom";

export default function ButtonToLink({ href, text }) {
  return (
    <Link to={href}>
      <button className="bg-blue-500 font-bold text-white py-2 w-32 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700">
        {text}
      </button>
    </Link>
  );
}
