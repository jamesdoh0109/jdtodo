import { Badge } from "flowbite-react";

export default function StatusBadge({ status }) {
  const color =
    status === "Complete"
      ? "success"
      : status === "In Progress"
      ? "warning"
      : "failure";

  return <Badge color={color}>{status}</Badge>;
}
