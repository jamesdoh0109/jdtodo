import { useMutateData } from "hooks/useDataOperations";

export const useDeleteTaskMutation = (queryClient, taskId, projectId) => {
  const requestConfig = {
    url: "/api/tasks/" + taskId,
    method: "DELETE",
  };

  return useMutateData(requestConfig, {
    onMutate: async () => {
      await queryClient.cancelQueries(["tasks", projectId]);
      const oldTasks = queryClient.getQueryData(["tasks", projectId]);
      queryClient.setQueryData(["tasks", projectId], (oldQueryData) => {
        return oldQueryData.filter((task) => task.id !== taskId);
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
