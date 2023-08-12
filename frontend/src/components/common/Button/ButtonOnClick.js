export default function ButtonOnClick({ text, disabled, onClick }) {
  return (
    <button
      className={`bg-blue-500 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 ${
        !disabled && "hover:bg-blue-700"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
