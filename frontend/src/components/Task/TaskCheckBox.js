import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "flowbite-react";
import { useMutateData } from "hooks/useDataOperations";

export default function TaskCheckBox({ className, checked, task }) {
  const taskId = task.id;
  const projectId = useParams().projectId;

  const queryClient = useQueryClient();

  const requestConfig = {
    url: `/api/tasks/${taskId}`,
    method: "PATCH",
  };

  const { mutate: toggleTaskStatus } = useMutateData(requestConfig, {
    onMutate: async () => {
      await queryClient.cancelQueries(["tasks", projectId]);
      const oldTasks = queryClient.getQueryData(["tasks", projectId]);
      queryClient.setQueryData(["tasks", projectId], (oldQueryData) => {
        const updatedTask = {
          id: taskId,
          name: task.name,
          deadline: task.deadline,
          status: task.isDone ? "Not started" : "Finished",
          description: task.description,
          isDone: !task.isDone,
        };
        return oldQueryData.map((task) =>
          task.id === taskId ? updatedTask : task
        );
      });
      return {
        oldTasks,
      };
    },
  });

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
