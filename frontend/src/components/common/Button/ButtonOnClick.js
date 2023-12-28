import { COLOR_TO_TAILWIND_CLASSES } from "util/constants";

export default function ButtonOnClick({ text, disabled, onClick, color }) {
  return (
    <button
      className={`${
        COLOR_TO_TAILWIND_CLASSES[color]["tailwind"]
      } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 ${
        !disabled &&
        `hover:${COLOR_TO_TAILWIND_CLASSES[color]["tailwindHover"]}`
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
