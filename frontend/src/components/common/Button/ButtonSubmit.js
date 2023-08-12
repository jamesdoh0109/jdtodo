export default function ButtonSubmit({ text, disabled }) {
  return (
    <button
      className={`bg-blue-500 text-white font-bold py-2 px-4 mr-2 mb-2 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 ${
        !disabled && "hover:bg-blue-700"
      }`}
      type="submit"
      disabled={disabled}
    >
      {text}
    </button>
  );
}
