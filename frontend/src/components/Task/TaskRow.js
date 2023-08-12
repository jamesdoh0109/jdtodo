import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskDetailActions } from "../../store/reducers/taskDetail";
import { modalActions } from "../../store/reducers/modal";
import { dropdownActions } from "../../store/reducers/dropdown";
import { formatDate } from "../../util/display";
import { deadlinePassed } from "../../util/form";
import { Table } from "flowbite-react";
import TaskStatusBadge from "./TaskStatusBadge";
import TaskDropdown from "./TaskDropdown";
import TaskCheckBox from "./TaskCheckBox";
import TaskOverdueWarningIcon from "./TaskOverdueWarningIcon";

export default function TaskRow({ task, isDesktopVersion }) {
  const taskIsOverdue = deadlinePassed(task.deadline) && !task.isDone;

  const dropdownId = useSelector((state) => state.dropdown.dropdownId);

  const [color, setColor] = useState("bg-white");

  const dispatch = useDispatch();

  const rowEventHandlers = {
    onMouseEnter: () => setColor("bg-slate-200"),
    onMouseLeave: () => setColor("bg-white"),
    onClick: () => {
      dispatch(
        taskDetailActions.onShowDetails({
          itemToBeShown: {
            id: task.id,
            name: task.name,
            deadline: task.deadline,
            description: task.description,
            status: task.status,
            isDone: task.status === "Finished",
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
    },
  };

  const dropdownEventHandlers = {
    onMouseLeave: () => setColor("bg-slate-200"),
    onMouseEnter: () => setColor("bg-white"),
  };

  const desktopTableRow = (
    <Table.Row
      className={`${color} dark:border-gray-700 dark:bg-gray-800`}
      key={task.id}
      {...rowEventHandlers}
    >
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        <TaskCheckBox checked={task.isDone} task={task} />
      </Table.Cell>
      <Table.Cell>
        {taskIsOverdue && <TaskOverdueWarningIcon />}
        {task.name}
      </Table.Cell>
      <Table.Cell>{formatDate(task.deadline)}</Table.Cell>
      <Table.Cell>
        <TaskStatusBadge taskStatus={task.status} />
      </Table.Cell>
      <Table.Cell>
        <TaskDropdown
          task={task}
          dropdownId={dropdownId}
          {...dropdownEventHandlers}
        />
      </Table.Cell>
    </Table.Row>
  );

  const mobileTableRow = (
    <li
      className={`${color} border border-gray-400 py-4 dark:bg-gray-800 flex items-center justify-between rounded-md mb-2`}
      key={task.id}
      {...rowEventHandlers}
    >
      <div className="flex items-center">
        <TaskCheckBox className="ml-4 mr-4" checked={task.isDone} task={task} />
        <div className="flex flex-col">
          <div className="inline">
            {taskIsOverdue && <TaskOverdueWarningIcon />}
            {task.name}
          </div>
          <TaskStatusBadge taskStatus={task.status} className="mt-2" />
        </div>
      </div>
      <div className="mr-10">
        <TaskDropdown
          task={task}
          dropdownId={dropdownId}
          {...dropdownEventHandlers}
        />
      </div>
    </li>
  );

  return isDesktopVersion ? desktopTableRow : mobileTableRow;
}
