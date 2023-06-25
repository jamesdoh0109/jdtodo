import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../../store/reducers/form";
import { modalActions } from "../../store/reducers/modal";
import { userDataActions } from "../../store/reducers/user-data";
import { dropdownActions } from "../../store/reducers/dropdown";
import { formatDate } from "../../util/display";
import { deadlinePassed } from "../../util/form";
import { Table, Checkbox } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import StatusBadge from "./StatusBadge";
import Dropdown from "./Dropdown";

export default function TaskRow({ task, dropdownId, isDesktopVersion }) {
  const id = useParams().projectId;
  const token = useSelector((state) => state.auth.token);
  const tasksForAllProjects = useSelector(
    (state) => state.userData.tasksForAllProjects
  );
  const tasksForCurrentProject = tasksForAllProjects?.find(
    (project) => project.id === id
  );

  const [color, setColor] = useState("bg-white");

  const { fetchData } = useFetch();

  const dispatch = useDispatch();

  const setHoverColor = () => {
    setColor("bg-slate-200");
  };

  const setLeaveColor = () => {
    setColor("bg-white");
  };

  const displayTaskDetail = () => {
    // works but using form action for displaying task detail on modal?
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
    dispatch(
      modalActions.toggle({
        modalOpen: true,
        modalType: "details",
      })
    );
    dispatch(
      dropdownActions.toggleDropdown({
        dropdownId: -1,
      })
    );
  };

  const displayEditedTask = () => {
    dispatch(
      userDataActions.updateTasks({
        type: "EDIT",
        taskToBeEdited: task.id,
        editedTask: {
          ...task,
          status: task.isDone ? "Not started" : "Finished",
          isDone: !task.isDone,
        },
        projectId: id,
        tasksForCurrentProject: tasksForCurrentProject,
      })
    );
  };

  const toggleTaskStatus = () => {
    const endpoint = `/api/tasks/${task.id}`;
    const requestConfig = {
      url: endpoint,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        status: task.isDone ? "Not started" : "Finished",
        is_done: !task.isDone,
      }),
    };
    fetchData(requestConfig, displayEditedTask);
  };

  const deadlinePassedWarning = (
    <FontAwesomeIcon icon={faExclamationCircle} className="w-4 mr-2" />
  );

  const desktopTableRow = (
    <Table.Row
      className={`${color} dark:border-gray-700 dark:bg-gray-800`}
      key={task.id}
      onMouseEnter={setHoverColor}
      onMouseLeave={setLeaveColor}
      onClick={displayTaskDetail}
    >
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        <Checkbox
          checked={task.isDone}
          onChange={() => toggleTaskStatus()}
          // prevent modal popup
          onClick={(e) => e.stopPropagation()}
        />
      </Table.Cell>
      <Table.Cell>
        <>
          {/* show warning if deadline is passed and task isn't done */}
          {deadlinePassed(task.deadline) &&
            !task.isDone &&
            deadlinePassedWarning}
          {task.name}
        </>
      </Table.Cell>
      <Table.Cell>{formatDate(task.deadline)}</Table.Cell>
      <Table.Cell>
        <StatusBadge status={task.status} />
      </Table.Cell>
      <Table.Cell>
        <Dropdown
          task={task}
          onLeave={setHoverColor}
          onHover={setLeaveColor}
          dropdownId={dropdownId}
        />
      </Table.Cell>
    </Table.Row>
  );

  const mobileTableRow = (
    <li
      className={`${color} border border-gray-400 py-4 dark:bg-gray-800 flex items-center justify-between rounded-md mb-2`}
      key={task.id}
      onClick={displayTaskDetail}
    >
      <div className="flex items-center">
        <Checkbox
          checked={task.isDone}
          onChange={() => toggleTaskStatus()}
          // prevent modal popup
          onClick={(e) => e.stopPropagation()}
          className="ml-4 mr-4"
        />
        <div className="flex flex-col">
          <div className="inline">
            {/* show warning if deadline is passed and task isn't done */}
            {deadlinePassed(task.deadline) &&
              !task.isDone &&
              deadlinePassedWarning}
            {task.name}
          </div>
          <StatusBadge status={task.status} className="mt-2" />
        </div>
      </div>
      <div className="mr-10">
        <Dropdown
          task={task}
          onLeave={setHoverColor}
          onHover={setLeaveColor}
          dropdownId={dropdownId}
        />
      </div>
    </li>
  );

  return isDesktopVersion ? desktopTableRow : mobileTableRow;
}
