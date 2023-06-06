import { Badge } from "flowbite-react";

export default function StatusBadge({ status }) {
  const color =
    status === "Finished"
      ? "success"
      : status === "In progress"
      ? "warning"
      : "failure";

  return <Badge size="xs" color={color} className="flex justify-center">{status}</Badge>;
}
