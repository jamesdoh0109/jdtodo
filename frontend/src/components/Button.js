import { Link } from "react-router-dom";

export default function Button({ href, text }) {
  if (href) {
    return (
      <Link to={href}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 w-32 rounded">
          {text}
        </button>
      </Link>
    );
  }
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit"
    >
      {text}
    </button>
  );
}
