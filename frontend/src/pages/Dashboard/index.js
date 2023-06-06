import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/reducers/modal";
import { userDataActions } from "../../store/reducers/user-data";
import { formActions } from "../../store/reducers/form";
import { sortById } from "../../util/display";
import useFetch from "../../hooks/useFetch";
import ProjectCard from "../../components/Project/ProjectCard";
import ProjectForm from "../../components/Project/ProjectForm";
import Button from "../../components/common/Button";
import Loading from "../../components/common/Loading";

export default function Dashboard() {
  const token = useSelector((state) => state.auth.token);
  const projects = useSelector((state) => state.userData.projects);
  const modalOpen = useSelector((state) => state.modal.modalOpen);
  const [initialLoading, setInitialLoading] = useState(true);

  const { isLoading, fetchData } = useFetch();

  const dispatch = useDispatch();

  useEffect(() => {
    // only make request on initial render of the screen (i.e. when projects is undefined)
    if (!projects && initialLoading) {
      const populateProjects = async (res) => {
        try {
          const data = await res.json();
          const projects = data.projects.map((project) => ({
            id: project.proj_id,
            name: project.proj_name,
            dateCreated: project.date_created,
          }));
          dispatch(userDataActions.setProjects({ projects: projects }));
        } catch (e) {
          console.log(e);
        }
      };

      const requestConfig = {
        url: "/api/projects",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      fetchData(requestConfig, undefined, populateProjects);
      setInitialLoading(false);
    }
  }, [fetchData, dispatch, projects, token, initialLoading]);

  const openCreateProjectModal = () => {
    dispatch(formActions.onCreate());
    dispatch(modalActions.toggle());
  };

  const createProjectBtn = (
    <div className="mt-32">
      <Button text="Create new project" onClick={openCreateProjectModal} />
    </div>
  );

  const dashboardWithNoProjects = (
    <>
      {createProjectBtn}
      <p className="mt-4">You currently don't have any projects.</p>
    </>
  );

  const dashboardWithProjects = (
    <>
      {createProjectBtn}
      <ul className="w-full grid mt-4 gap-y-7 pl-xl:grid-cols-g-xl pl-lg:grid-cols-g-lg pl-md:grid-cols-g-md pl-sm:grid-cols-g-sm pl-xs:grid-cols-g-xs justify-start">
        {projects &&
          sortById(projects).map((project) => (
            <li key={project.id} className="mr-8">
              <ProjectCard
                id={project.id}
                name={project.name}
                dateCreated={project.dateCreated}
              />
            </li>
          ))}
      </ul>
    </>
  );

  return (
    <div className="flex justify-center w-full">
      <div className="w-4/5">
        {modalOpen && <ProjectForm token={token} />}
        {isLoading && <Loading />}
        {!isLoading && projects?.length === 0 && dashboardWithNoProjects}
        {!isLoading && projects?.length > 0 && dashboardWithProjects}
      </div>
    </div>
  );
}
