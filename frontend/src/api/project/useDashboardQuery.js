import { useQueryData } from "hooks/useDataOperations";

export const useDashboardQuery = () => {
  const requestConfig = {
    url: "/api/projects",
  };

  const select = (data) =>
    data.projects.map((project) => ({
      id: project.proj_id,
      name: project.proj_name,
      dateUpdated: project.date_updated,
    }));

  return useQueryData(requestConfig, ["projects"], select);
};
