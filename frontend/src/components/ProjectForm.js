import { Modal, Button, Label, TextInput, Checkbox } from "flowbite-react";
import { useContext, useState } from "react";
import UserDataContext from "../store/user-data-context";
import ModalContext from "../store/modal-context";

export default function ModalForm({ token, addNew }) {
  const userCtx = useContext(UserDataContext);
  const modalCtx = useContext(ModalContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const createProject = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://jihundoh0109-humble-space-potato-57v96jp6q5gh77p6-5000.preview.app.github.dev/api/projects",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
              name: e.target.elements["project-name"].value,
            }),
          }
        );
        const data = await response.json();
        const newProject = {
          date_created: data.project.date_created,
          proj_id: data.project.proj_id,
          proj_name: data.project.proj_name,
        };
        userCtx.setProjects([...userCtx.projects, newProject]);
      } catch (e) {
        console.log(e);
      }
      modalCtx.setIsModalOpen(false);
      setIsLoading(false);
      e.target.reset();
    };

    const editProject = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://jihundoh0109-humble-space-potato-57v96jp6q5gh77p6-5000.preview.app.github.dev/api/projects",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
              name: e.target.elements["project-name"].value,
            }),
          }
        );
        const data = await response.json();
        const newProject = {
          date_created: data.project.date_created,
          proj_id: data.project.proj_id,
          proj_name: data.project.proj_name,
        };
        userCtx.setProjects([...userCtx.projects, newProject]);
      } catch (e) {
        console.log(e);
      }
      modalCtx.setIsModalOpen(false);
      setIsLoading(false);
      e.target.reset();
    }
    if (addNew) {
      createProject();
    } else {
      editProject()
    }
  };

  return (
    <>
      <Modal
        show={modalCtx.isModalOpen}
        size="md"
        popup={true}
        onClose={() => modalCtx.setIsModalOpen(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                {addNew ? "Create a new project" : "Edit project"}
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="project-name" value="Project name" />
                </div>
                <TextInput
                  id="project-name"
                  placeholder="e.g. final exam prep"
                />
              </div>
              <div className="w-full">
                {addNew ? (
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating" : "Create project"}
                  </Button>
                ) : (
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Editing" : "Edit project"}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
