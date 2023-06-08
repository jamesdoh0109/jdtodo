import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dropdownActions } from "../../store/reducers/dropdown";
import { formActions } from "../../store/reducers/form";
import { modalActions } from "../../store/reducers/modal";
import { userDataActions } from "../../store/reducers/user-data";
import { ListGroup } from "flowbite-react";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../../hooks/useFetch";

export default function Dropdown({ task, onLeave, onHover }) {
  const id = useParams().projectId;
  const token = useSelector((state) => state.auth.token);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownIndex = useSelector((state) => state.dropdown.dropdownIndex);

  const tasksForAllProjects = useSelector(
    (state) => state.userData.tasksForAllProjects
  );
  const tasksForCurrentProject = tasksForAllProjects?.find(
    (project) => project.id === id
  );

  const { fetchData } = useFetch();

  const dispatch = useDispatch();

  const showDropdown = (id) => {
    dispatch(
      dropdownActions.toggleDropdown({
        dropdownIndex: id,
      })
    );
    setDropdownOpen((prevDropdownOpen) => !prevDropdownOpen);
  };

  // change dropdownOpen back to false, o.w. it will stay true and dropdown will be hidden
  // meaning the user would have to click it twice for it to show again
  if (dropdownOpen && dropdownIndex !== task.id) {
    setDropdownOpen((prevDropdownOpen) => !prevDropdownOpen);
  }

  const handleOnEdit = (e) => {
    e.stopPropagation();
    dispatch(
      formActions.onEdit({
        itemToBeEdited: {
          id: task.id,
          name: task.name,
          deadline: task.deadline,
          description: task.description,
          status: task.status,
          isDone: task.isDone,
        },
      })
    );
    dispatch(modalActions.toggle());
    setDropdownOpen((prevDropdownOpen) => !prevDropdownOpen);
  };

  const undisplayDeletedTask = (res) => {
    dispatch(
      userDataActions.updateTasks({
        type: "DELETE",
        taskToBeDeleted: task.id,
        projectId: id,
        tasksForCurrentProject: tasksForCurrentProject,
      })
    );
  };

  const handleOnDelete = (e) => {
    e.stopPropagation();
    const requestConfig = {
      url: "/api/tasks/" + task.id,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    fetchData(requestConfig, undisplayDeletedTask);
  };

  const dropdown = (
    <div
      className="absolute z-50 mt-2"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <ListGroup>
        <ListGroup.Item onClick={handleOnEdit}>Edit</ListGroup.Item>
        <ListGroup.Item onClick={handleOnDelete}>Delete</ListGroup.Item>
      </ListGroup>
    </div>
  );

  return (
    <div className="relative">
      <FontAwesomeIcon
        icon={faEllipsisV}
        className="cursor-pointer w-2"
        onClick={(e) => {
          // prevent modal popup
          e.stopPropagation();
          showDropdown(task.id);
        }}
      />
      {dropdownOpen && dropdownIndex === task.id && dropdown}
    </div>
  );
}
