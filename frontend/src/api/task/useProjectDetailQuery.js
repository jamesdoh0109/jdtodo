import { useQueryData } from "hooks/useDataOperations";

export const useProjectDetailQuery = (projectId) => {
  const requestConfig = {
    url: `/api/${projectId}/tasks`,
  };

  const select = (data) =>
    data.tasks.map((task) => ({
      id: task.task_id,
      name: task.task_name,
      deadline: task.task_deadline,
      status: task.task_status,
      description: task.task_description,
      isDone: task.task_status === "Finished",
    }));

  return useQueryData(requestConfig, ["tasks", projectId], select);
};
