import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TaskOverdueWarningMessage({ numOverdueTasks }) {
  return (
    <>
      <FontAwesomeIcon icon={faExclamationCircle} className="w-4 mr-2" />
      <p className="inline">
        You have {numOverdueTasks} overdue{" "}
        {numOverdueTasks === 1 ? "task" : "tasks"}.
      </p>
    </>
  );
}
