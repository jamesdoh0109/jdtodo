export default function Input({
  id,
  type,
  name,
  placeholder,
  onFocus,
  onKeyUp,
  errors,
  register,
  setFieldActive
}) {
  return (
    <input
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
        errors[name] && "border-red-600"
      }`}
      id={id}
      type={type}
      name={name}
      placeholder={placeholder ? placeholder : ""}
      onFocus={onFocus}
      onKeyUp={onKeyUp}
      {...register(name, {
        onBlur: () => setFieldActive(false),
      })}
    />
  );
}
