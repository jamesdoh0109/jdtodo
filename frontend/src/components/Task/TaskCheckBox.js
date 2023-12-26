import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "flowbite-react";
import { useToggleTaskStatusMutation } from "api/task/useToggleTaskStatusMutation";

export default function TaskCheckBox({ className, checked, task }) {
  const taskId = task.id;
  const projectId = useParams().projectId;

  const queryClient = useQueryClient();

  const { mutate: toggleTaskStatus } = useToggleTaskStatusMutation(
    queryClient,
    task,
    taskId,
    projectId
  );

  return (
    <Checkbox
      className={className}
      checked={checked}
      onChange={() =>
        toggleTaskStatus({
          status: task.isDone ? "Not started" : "Finished",
        })
      }
      // prevent modal popup
      onClick={(e) => e.stopPropagation()}
    />
  );
}
