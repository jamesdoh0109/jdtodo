import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/reducers/modal";
import { userDataActions } from "../store/reducers/user-data";

export default function Dashboard() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const projects = useSelector((state) => state.userData.projects);

  // loading === true on initial render (i.e. first time fetching projects)
  const [isLoading, setIsLoading] = useState(!projects);

  const [onCreateNewProject, setOnCreateNewProject] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await fetch(
          "https://jihundoh0109-humble-space-potato-57v96jp6q5gh77p6-5000.preview.app.github.dev/api/projects",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const data = await response.json();
        console.log(data.projects);
        const projects = data.projects;
        dispatch(userDataActions.setProjects({ projects: projects }));
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    if (!projects) {
      getProjects();
    }
  }, []);

  const openCreateProjectModal = () => {
    setOnCreateNewProject(true);
    dispatch(modalActions.toggle());
  };

  const createProjectBtn = (
    <div style={{ marginTop: "8rem" }}>
      <Button onClick={openCreateProjectModal}>Create new project</Button>
    </div>
  );

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div style={{ width: "80%" }}>
        <ProjectForm token={token} addNew={onCreateNewProject} />
        {isLoading && <p style={{ marginTop: "8rem" }}>Loading...</p>}
        {!isLoading && projects?.length === 0 && (
          <>
            {createProjectBtn}
            <p style={{ marginTop: "1rem" }}>
              You currently don't have any projects.
            </p>
          </>
        )}
        {!isLoading && projects?.length > 0 && (
          <>
            {createProjectBtn}
            <ul className="project-list">
              {projects.map((project) => (
                <li key={project.proj_id}>
                  <ProjectCard
                    id={project.proj_id}
                    name={project.proj_name}
                    dateCreated={project.date_created}
                    setOnCreateNewProject={setOnCreateNewProject}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
