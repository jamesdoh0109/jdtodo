import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/reducers/modal";
import { userDataActions } from "../../store/reducers/user-data";
import { projectNameTooLong } from "../../util/form";
import useFetch from "../../hooks/useFetch";
import Input from "../common/Input";
import Modal from "../common/Modal";
import Button from "../common/Button";
import Message from "../common/Message";

export default function ProjectForm({ token }) {
  const projects = useSelector((state) => state.userData.projects);
  const creatingNew = useSelector((state) => state.projectForm.creatingNew);
  const projectToBeEdited = useSelector(
    (state) => state.projectForm.projectToBeEdited
  );

  const [projectName, setProjectName] = useState(
    projectToBeEdited ? projectToBeEdited.name : ""
  );

  const { status, setStatus, isLoading, fetchData } = useFetch();

  const dispatch = useDispatch();

  const displayEditedProject = async (res) => {
    try {
      const editedProject = {
        dateCreated: projectToBeEdited.dateCreated,
        id: projectToBeEdited.id,
        name: projectName,
      };
      const filteredProjects = projects.filter(
        (project) => project.id !== projectToBeEdited.id
      );
      dispatch(
        userDataActions.setProjects({
          projects: [...filteredProjects, editedProject],
        })
      );
      dispatch(modalActions.toggle());
    } catch (e) {
      console.log(e);
    }
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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (projectNameTooLong(projectName.trim())) {
      setStatus({
        error: true,
        message: "Name must be less than 25 characters.",
      });
    } else {
      submitForm();
    }
  };

  const submitForm = () => {
    const endpoint = `/api/projects${
      !creatingNew ? "/" + projectToBeEdited.id : ""
    }`;
    console.log(endpoint);
    const requestConfig = {
      url: endpoint,
      method: creatingNew ? "POST" : "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: projectName.trim(),
      }),
    };
    fetchData(
      requestConfig,
      creatingNew ? displayNewProject : displayEditedProject
    );
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
      {creatingNew ? createButton : editButton}
      {closeButton}
    </div>
  );

  return (
    <>
      <Modal>
        {status.error && <Message errorMsg={status.message} />}
        <form onSubmit={handleOnSubmit}>
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
