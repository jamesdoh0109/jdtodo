import { useMutateData } from "hooks/useDataOperations";
import { handleCreateOrEdit } from "util/form";

export const useCreateOrEditProjectMutation = (
  queryClient,
  dispatch,
  setStatus,
  projectToBeEdited,
  isCreatingNew
) => {
  const requestConfig = {
    url: `/api/projects${!isCreatingNew ? "/" + projectToBeEdited.id : ""}`,
    method: isCreatingNew ? "POST" : "PATCH",
  };

  return useMutateData(
    requestConfig,
    handleCreateOrEdit(
      queryClient,
      ["projects"],
      (data) => ({
        id: data.project.proj_id,
        name: data.project.proj_name,
        dateUpdated: data.project.date_updated,
      }),
      isCreatingNew,
      dispatch,
      "project",
      setStatus
    )
  );
};
