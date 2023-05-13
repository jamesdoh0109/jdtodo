import { Link } from "react-router-dom";
import { Card } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import UserDataContext from "../store/user-data-context";
import AuthContext from "../store/auth-context";
import ModalContext from "../store/modal-context";

export default function ProjectCard({ id, name, dateCreated, setOnCreateNewProject }) {
  const userCtx = useContext(UserDataContext);
  const authCtx = useContext(AuthContext);
  const modalCtx = useContext(ModalContext);

  const handleDeleteProject = () => {
    const deleteProject = async () => {
      try {
        const response = await fetch(
          "https://jihundoh0109-humble-space-potato-57v96jp6q5gh77p6-5000.preview.app.github.dev/api/projects/" + id,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + authCtx.token,
            }
          }
        );
        const filteredProjects = userCtx.projects.filter(project => project.proj_id !== id);
        console.log(filteredProjects);
        userCtx.setProjects(filteredProjects);
        const data = await response.json();
        console.log(data)
      } catch (e) {
        console.log(e)
      }
    };
    deleteProject();
  };

  const openEditProjectModal = () => {
    setOnCreateNewProject(false)
    modalCtx.setIsModalOpen(true)
  }

  return (
    <Link style={{ cursor: "default" }} to={"/account"}>
      <Card className="card w-60">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400 text-sm">
          <i>Created on {dateCreated}</i>
        </p>
        <div style={{ display: 'flex' }}>
          <FontAwesomeIcon
            icon={faTrash}
            style={{ cursor: "pointer", width: "16px", marginRight: '9px' }}
            onClick={(e) => {
              e.preventDefault();
              handleDeleteProject()
            }}
          />
          <FontAwesomeIcon
            icon={faEdit}
            style={{ cursor: "pointer", width: "16px" }}
            onClick={(e) => {
              e.preventDefault();
              openEditProjectModal();
            }}
          />
        </div>
      </Card>
    </Link>
  );
}
