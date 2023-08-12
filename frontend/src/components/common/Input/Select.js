export default function Select({
  id,
  name,
  onFocus,
  onKeyUp,
  errors,
  register,
  setFieldActive,
  options,
}) {
  return (
    <select
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
        errors[name] && "border-red-600"
      }`}
      id={id}
      name={name}
      onFocus={onFocus}
      onKeyUp={onKeyUp}
      {...register(name, {
        onBlur: () => setFieldActive(false),
      })}
    >
      {options.map(({ value, text }) => (
        <option key={value} value={value}>{text}</option>
      ))}
    </select>
  );
}
