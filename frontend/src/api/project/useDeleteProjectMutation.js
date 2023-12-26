import { useMutateData } from "hooks/useDataOperations";

export const useDeleteProjectMutation = (queryClient, projectId) => {
  const requestConfig = {
    url: "/api/projects/" + projectId,
    method: "DELETE",
  };

  return useMutateData(requestConfig, {
    onMutate: async () => {
      await queryClient.cancelQueries(["projects"]);
      const oldProjects = queryClient.getQueryData(["projects"]);
      queryClient.setQueryData(["projects"], (oldQueryData) => {
        return oldQueryData.filter((project) => project.id !== projectId);
      });
      return {
        oldProjects,
      };
    },
    onError: (_err, _variables, context) =>
      queryClient.setQueryData(["projects"], context.oldProjects),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
};
