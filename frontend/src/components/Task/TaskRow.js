import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../../store/reducers/form";
import { modalActions } from "../../store/reducers/modal";
import { userDataActions } from "../../store/reducers/user-data";
import { formatDate } from "../../util/display";
import { Table, Checkbox } from "flowbite-react";
import StatusBadge from "./StatusBadge";
import useFetch from "../../hooks/useFetch";
import Dropdown from "./Dropdown";

export default function TaskRow({ task }) {
  const id = useParams().projectId;
  const token = useSelector((state) => state.auth.token);
  const [color, setColor] = useState("bg-white");
  const tasksForAllProjects = useSelector(
    (state) => state.userData.tasksForAllProjects
  );
  const tasksForCurrentProject = tasksForAllProjects?.find(
    (project) => project.id === id
  );

  const { fetchData } = useFetch();

  const dispatch = useDispatch();

  const setHoverColor = () => {
    setColor("bg-slate-200");
  };

  const setLeaveColor = () => {
    setColor("bg-white");
  };

  const handleOnEdit = () => {
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
  };

  const displayEditedTask = () => {
    dispatch(
      userDataActions.updateTasks({
        type: "EDIT",
        taskToBeEdited: task.id,
        task: task,
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

  return (
    <Table.Row
      className={`${color} dark:border-gray-700 dark:bg-gray-800`}
      key={task.id}
      onMouseEnter={setHoverColor}
      onMouseLeave={setLeaveColor}
      onClick={handleOnEdit}
    >
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        <Checkbox
          checked={task.isDone}
          onChange={() => toggleTaskStatus()}
          // prevent modal popup
          onClick={(e) => e.stopPropagation()}
        />
      </Table.Cell>
      <Table.Cell>{task.name}</Table.Cell>
      <Table.Cell>{formatDate(task.deadline)}</Table.Cell>
      <Table.Cell>
        <StatusBadge status={task.status} />
      </Table.Cell>
      <Table.Cell>
        <Dropdown task={task} onLeave={setHoverColor} onHover={setLeaveColor} />
      </Table.Cell>
    </Table.Row>
  );
}
