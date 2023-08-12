import { useSelector } from "react-redux";
import { useQueryData } from "../../hooks/useDataOperations";
import ProjectForm from "../../components/Project/ProjectForm";
import Loading from "../../components/common/Loading";
import ProjectList from "../../components/Project/ProjectList";
import ButtonOpenModal from "../../components/common/Button/ButtonOpenModal";

export default function Dashboard() {
  const token = useSelector((state) => state.auth.token);
  const modalOpen = useSelector((state) => state.modal.modalOpen);
  const modalType = useSelector((state) => state.modal.modalType);

  const requestConfig = {
    url: "/api/projects",
    token: token,
  };

  const select = (data) =>
    data.projects.map((project) => ({
      id: project.proj_id,
      name: project.proj_name,
      dateUpdated: project.date_created,
    }));

  const { isLoading, data: projects } = useQueryData(
    requestConfig,
    ["projects"],
    select
  );

  return (
    <div className="flex justify-center w-full">
      <div className="w-4/5">
        {modalOpen && modalType === "form" && <ProjectForm />}
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            <ButtonOpenModal btnTxt="Create new project" modalFor="project" />
            <ProjectList projects={projects} />
          </>
        )}
      </div>
    </div>
  );
}
