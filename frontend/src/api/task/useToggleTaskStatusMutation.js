import { useMutateData } from "hooks/useDataOperations";

export const useToggleTaskStatusMutation = (
  queryClient,
  task,
  taskId,
  projectId
) => {
  const requestConfig = {
    url: `/api/tasks/${taskId}`,
    method: "PATCH",
  };

  return useMutateData(requestConfig, {
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
    onError: (_err, _variables, context) =>
      queryClient.setQueryData(["tasks", projectId], context.oldTasks),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] }),
  });
};
