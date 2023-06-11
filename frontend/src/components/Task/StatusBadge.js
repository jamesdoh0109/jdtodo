import { Badge } from "flowbite-react";

export default function StatusBadge({ status, forTaskDetail }) {
  const color =
    status === "Finished"
      ? "success"
      : status === "In progress"
      ? "warning"
      : "failure";

  return (
    <Badge
      size="xs"
      color={color}
      className={forTaskDetail ? "inline-flex" : "flex justify-center"}
    >
      {status}
    </Badge>
  );
}
