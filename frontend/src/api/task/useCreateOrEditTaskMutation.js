import { useMutateData } from "hooks/useDataOperations";
import { handleCreateOrEdit } from "util/form";

export const useCreateOrEditTaskMutation = (
  queryClient,
  dispatch,
  setStatus,
  isCreatingNew,
  projectId,
  taskToBeEdited
) => {
  const requestConfig = {
    url: isCreatingNew
      ? `/api/${projectId}/tasks`
      : `/api/tasks/${taskToBeEdited.id}`,
    method: isCreatingNew ? "POST" : "PATCH",
  };

  return useMutateData(
    requestConfig,
    handleCreateOrEdit(
      queryClient,
      ["tasks", projectId],
      (data) => ({
        id: data.task.task_id,
        name: data.task.task_name,
        deadline: data.task.task_deadline,
        status: data.task.task_status,
        description: data.task.task_description,
        isDone: data.task.task_status === "Finished",
      }),
      isCreatingNew,
      dispatch,
      "task",
      setStatus
    )
  );
};
