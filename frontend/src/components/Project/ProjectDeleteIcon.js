import { useQueryClient } from "@tanstack/react-query";
import { useDeleteProjectMutation } from "api/project/useDeleteProjectMutation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ProjectDeleteIcon({ projectId }) {
  const queryClient = useQueryClient();

  const { mutate: deleteProject } = useDeleteProjectMutation(
    queryClient,
    projectId
  );

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
