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
      className={forTaskDetail ? "inline-flex mr-2" : "flex justify-center"}
    >
      {status}
    </Badge>
  );
}
