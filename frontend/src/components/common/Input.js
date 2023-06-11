export default function Input({
  id,
  type,
  name,
  placeholder,
  onChange,
  value,
}) {
  if (type !== "select" && type !== "textarea") {
    return (
      <div className="mb-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      </div>
    );
  }
  if (type === "select") {
    return (
      <select
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        name={name}
        onChange={onChange}
        value={value}
      >
        <option value="Not started">Not started</option>
        <option value="In progress">In progress</option>
        <option value="Finished">Finished</option>
      </select>
    );
  }
  if (type === "textarea") {
    return (
      <textarea
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        rows={3}
      />
    );
  }
}
