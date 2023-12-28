import { Link } from "react-router-dom";
import { COLOR_TO_TAILWIND_CLASSES } from "util/constants";

export default function ButtonToLink({ href, text, color }) {
  return (
    <Link to={href}>
      <button
        className={`${COLOR_TO_TAILWIND_CLASSES[color]["tailwind"]} font-bold text-white py-2 w-32 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700`}
      >
        {text}
      </button>
    </Link>
  );
}
