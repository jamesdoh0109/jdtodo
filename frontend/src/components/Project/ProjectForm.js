import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/reducers/modal";
import { userDataActions } from "../../store/reducers/user-data";
import useFetch from "../../hooks/useFetch";
import Input from "../common/Input";
import Modal from "../common/Modal";
import Button from "../common/Button";

export default function ProjectForm({ token }) {
  const projects = useSelector((state) => state.userData.projects);
  const creatingNew = useSelector((state) => state.projectForm.creatingNew);
  const projectToBeEdited = useSelector((state) => state.projectForm.projectToBeEdited);

  const [projectName, setProjectName] = useState(
    projectToBeEdited ? projectToBeEdited.name : ""
  );

  const { isLoading, fetchData } = useFetch();

  const dispatch = useDispatch();

  const displayEditedProject = async (res) => {
    try {
      const newProject = {
        dateCreated: projectToBeEdited.dateCreated,
        id: projectToBeEdited.id,
        name: projectName,
      };
      const filteredProjects = projects.filter(
        (project) => project.id !== projectToBeEdited.id
      );
      dispatch(
        userDataActions.setProjects({
          projects: [...filteredProjects, newProject],
        })
      );
      dispatch(modalActions.toggle());
    } catch (e) {
      console.log(e);
    }
  };

  const editProject = async (e) => {
    e.preventDefault();
    const requestConfig = {
      url: "/api/projects/" + projectToBeEdited.id,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: projectName,
      }),
    };
    fetchData(requestConfig, displayEditedProject);
  };

  const displayNewProject = async (res) => {
    try {
      const data = await res.json();
      const newProject = {
        dateCreated: data.project.date_created,
        id: data.project.proj_id,
        name: data.project.proj_name,
      };
      dispatch(
        userDataActions.setProjects({ projects: [...projects, newProject] })
      );
      dispatch(modalActions.toggle());
    } catch (e) {
      console.log(e);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();
    const requestConfig = {
      url: "/api/projects",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: projectName,
      }),
    };
    fetchData(requestConfig, displayNewProject);
  };

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const createButton = (
    <Button
      text={isLoading ? "Creating" : "Create project"}
      submit={true}
      isLoading={isLoading}
    />
  );

  const editButton = (
    <Button
      text={isLoading ? "Editing" : "Edit project"}
      submit={true}
      isLoading={isLoading}
    />
  );

  const closeButton = (
    <Button
      text="Close"
      onClick={() => {
        dispatch(modalActions.toggle());
      }}
      isLoading={isLoading}
      color="slate"
    />
  );

  const formTitle = (
    <h2 className="text-xl font-medium text-gray-900 dark:text-white">
      {creatingNew ? "Create a new project" : "Edit project"}
    </h2>
  );

  const formInput = (
    <div>
      <div className="mb-2 block">
        <label htmlFor="project-name" value="Project name" />
      </div>
      <Input
        id="project-name"
        type="text"
        placeholder="e.g. final exam prep"
        onChange={handleProjectNameChange}
        value={projectName}
      />
    </div>
  );

  const formButtons = (
    <div className="w-full">
      {creatingNew ? createButton  : editButton}
      {closeButton}
    </div>
  );

  return (
    <>
      <Modal>
        <form onSubmit={creatingNew ? createProject : editProject}>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            {formTitle}
            {formInput}
            {formButtons}
          </div>
        </form>
      </Modal>
    </>
  );
}
