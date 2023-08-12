export default function TaskModalTitle({ isCreatingNew, taskName }) {
  return (
    <h2
      className={`text-xl font-medium text-gray-900 dark:text-white ${
        taskName ? "text-2xl" : "text-xl"
      }`}
    >
      {!taskName
        ? isCreatingNew
          ? "Create a new task"
          : "Edit task"
        : taskName}
    </h2>
  );
}
