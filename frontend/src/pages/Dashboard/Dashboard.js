import { useSelector } from "react-redux";
import { useDashboardQuery } from "api/project/useDashboardQuery";
import ProjectForm from "components/Project/ProjectForm";
import Loading from "components/common/Loading";
import ProjectList from "components/Project/ProjectList";
import ButtonOpenModal from "components/common/Button/ButtonOpenModal";

export default function Dashboard() {
  const { isLoading, data: projects } = useDashboardQuery();

  const { modalOpen, modalType } = useSelector((state) => state.modal);

  return (
    <div className="flex justify-center w-full">
      <div className="w-4/5">
        {modalOpen && modalType === "form" && <ProjectForm />}
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            <ButtonOpenModal
              btnTxt="Create new project"
              modalFor="project"
              color="blue"
            />
            <ProjectList projects={projects} />
          </>
        )}
      </div>
    </div>
  );
}
