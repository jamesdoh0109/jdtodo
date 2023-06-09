import { sortByDeadline, sortById, sortByName, sortByStatus } from "../../util/display";
import { Table } from "flowbite-react";
import TaskRow from "./TaskRow";

export default function TaskTable({ tasks, sortBy }) {
  const tableHeader = (
    <Table.Head>
      <Table.HeadCell className="w-6"></Table.HeadCell>
      <Table.HeadCell>Task name</Table.HeadCell>
      <Table.HeadCell className="w-24">Deadline</Table.HeadCell>
      <Table.HeadCell className="w-36">Status</Table.HeadCell>
      <Table.HeadCell className="w-6"></Table.HeadCell>
    </Table.Head>
  );

  const tableRow = (task) => <TaskRow key={task.id} task={task} />;

  const getSortedTasks = () => {
    if (sortBy === 'Sort By') {
      return sortById(tasks)
    } else if (sortBy === 'Deadline') {
      return sortByDeadline(tasks)
    } else if (sortBy === 'Name') {
      return sortByName(tasks)
    } else {
      return sortByStatus(tasks)
    }
  }

  const tableBody = (
    <Table.Body className="divide-y">
      {tasks && getSortedTasks().map((task) => tableRow(task))}
    </Table.Body>
  );

  return (
    <Table>
      {tableHeader}
      {tableBody}
    </Table>
  );
}
