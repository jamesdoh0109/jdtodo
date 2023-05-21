import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/reducers/modal";
import { userDataActions } from "../../store/reducers/user-data";
import { projectFormActions } from "../../store/reducers/project-form";
import { splitNameIntoLines } from "../../util/form";
import { Card } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";

export default function ProjectCard({ id, name, dateCreated }) {
  const projects = useSelector((state) => state.userData.projects);
  const token = useSelector((state) => state.auth.token);
  const formattedName = splitNameIntoLines(name);

  const { fetchData } = useFetch();

  const dispatch = useDispatch();

  const undisplayDeletedProject = (res) => {
    const filteredProjects = projects.filter((project) => project.id !== id);
    dispatch(userDataActions.setProjects({ projects: filteredProjects }));
  };

  const handleDeleteProject = () => {
    const requestConfig = {
      url: "/api/projects/" + id,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    fetchData(requestConfig, undisplayDeletedProject);
  };

  const openEditProjectModal = () => {
    dispatch(
      projectFormActions.onEditProject({
        projectToBeEdited: { id: id, name: name, dateCreated: dateCreated },
      })
    );
    dispatch(modalActions.toggle());
  };

  const projectName = (
    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white w-48 mb-auto mt-2.5">
      {formattedName}
    </h5>
  );

  const projectCreatedDate = (
    <p className="font-normal text-gray-700 dark:text-gray-400 text-sm">
      <i>Created on {dateCreated}</i>
    </p>
  );

  const actionIcons = (
    <div className="flex mt-2">
      <FontAwesomeIcon
        icon={faTrash}
        className="cursor-pointer w-4 mr-2"
        onClick={(e) => {
          e.preventDefault();
          handleDeleteProject();
        }}
      />
      <FontAwesomeIcon
        icon={faEdit}
        className="cursor-pointer w-4"
        onClick={(e) => {
          e.preventDefault();
          openEditProjectModal();
        }}
      />
    </div>
  );

  return (
    <Link className="cursor-default" to={"/dashboard/" + id}>
      <Card className="hover:opacity-70 w-60 h-52">
        {projectName}
        <div className="mt-auto mb-2.5">
          {projectCreatedDate}
          {actionIcons}
        </div>
      </Card>
    </Link>
  );
}
