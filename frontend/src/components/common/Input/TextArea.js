export default function TextArea({
  id,
  name,
  onFocus,
  onKeyUp,
  errors,
  register,
  setFieldActive,
}) {
  return (
    <textarea
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
        errors[name] && "border-red-600"
      }`}
      id={id}
      name={name}
      onFocus={onFocus}
      onKeyUp={onKeyUp}
      rows={3}
      {...register(name, {
        onBlur: () => setFieldActive(false),
      })}
    />
  );
}
