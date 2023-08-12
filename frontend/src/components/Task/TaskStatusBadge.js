import { Badge } from "flowbite-react";

export default function TaskStatusBadge({ taskStatus, forTaskDetail }) {
  const color =
    taskStatus === "Finished"
      ? "success"
      : taskStatus === "In progress"
      ? "warning"
      : "failure";

  return (
    <Badge
      size="xs"
      color={color}
      className={forTaskDetail ? "inline-flex mr-2" : "flex justify-center"}
    >
      {taskStatus}
    </Badge>
  );
}
