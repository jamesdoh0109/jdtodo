import { Link } from "react-router-dom";

export default function Button({ href, text, submit, isLoading, onClick }) {
  if (href) {
    return (
      <Link to={href}>
        <button
          className={`bg-blue-500 font-bold text-white py-2 w-32 rounded focus:outline-none focus:shadow-outline ${
            !isLoading && "hover:bg-blue-700"
          }`}
        >
          {text}
        </button>
      </Link>
    );
  }
  if (submit) {
    return (
      <button
        className={`bg-blue-500 text-white font-bold py-2 px-4 mr-2 mb-2 rounded focus:outline-none focus:shadow-outline disabled:opacity-75 ${
          !isLoading && "hover:bg-blue-700"
        }`}
        type="submit"
        disabled={isLoading}
      >
        {text}
      </button>
    );
  }
  if (onClick) {
    return (
      <button
        className={`bg-blue-500 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline disabled:opacity-75 ${
          !isLoading && "hover:bg-blue-700"
        }`}
        onClick={onClick}
        disabled={isLoading}
      >
        {text}
      </button>
    );
  }
}
