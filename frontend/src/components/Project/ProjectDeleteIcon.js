import { useQueryClient } from "@tanstack/react-query";
import { useMutateData } from "hooks/useDataOperations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ProjectDeleteIcon({ projectId }) {
  const queryClient = useQueryClient();

  const requestConfig = {
    url: "/api/projects/" + projectId,
    method: "DELETE",
  };

  const { mutate: deleteProject } = useMutateData(requestConfig, {
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

  return (
    <FontAwesomeIcon
      icon={faTrash}
      className="cursor-pointer w-4 mr-2"
      onClick={(e) => {
        e.preventDefault();
        deleteProject();
      }}
    />
  );
}
