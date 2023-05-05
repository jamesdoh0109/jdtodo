export default function Message({ error }) {
  return (
    <div
      className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 text-left mb-6"
      role="alert"
    >
      <p>{error}</p>
    </div>
  );
}
