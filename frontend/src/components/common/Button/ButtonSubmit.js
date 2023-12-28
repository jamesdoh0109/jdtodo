import { COLOR_TO_TAILWIND_CLASSES } from "util/constants";

export default function ButtonSubmit({ text, disabled, color }) {
  return (
    <button
      className={`${
        COLOR_TO_TAILWIND_CLASSES[color]["tailwind"]
      } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 ${
        !disabled &&
        `hover:${COLOR_TO_TAILWIND_CLASSES[color]["tailwindHover"]}`
      }`}
      type="submit"
      disabled={disabled}
    >
      {text}
    </button>
  );
}
