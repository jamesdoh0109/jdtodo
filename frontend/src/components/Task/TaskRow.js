import { useState } from "react";
import { useDispatch } from "react-redux";
import { formActions } from "../../store/reducers/form";
import { modalActions } from "../../store/reducers/modal";
import { formatDate } from "../../util/display";
import { Table, Checkbox } from "flowbite-react";
import StatusBadge from "./StatusBadge";

export default function TaskRow({ task }) {
  const [color, setColor] = useState("bg-white");

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
          isDone: task.is_done,
        },
      })
    );
    dispatch(modalActions.toggle());
  };

  return (
    <Table.Row
      className={`${color} dark:border-gray-700 dark:bg-gray-800 cursor-pointer`}
      key={task.id}
      onMouseEnter={setHoverColor}
      onMouseLeave={setLeaveColor}
      onClick={handleOnEdit}
    >
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        <Checkbox
          defaultChecked={task.isDone}
          onClick={() => console.log("clicked")}
        />
      </Table.Cell>
      <Table.Cell>{task.name}</Table.Cell>
      <Table.Cell>{formatDate(task.deadline)}</Table.Cell>
      <Table.Cell>
        <StatusBadge status={task.status} />
      </Table.Cell>
    </Table.Row>
  );
}
