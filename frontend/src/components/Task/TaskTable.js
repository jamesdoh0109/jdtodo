import { sortById } from "../../util/display";
import { Table } from "flowbite-react";
import TaskRow from "./TaskRow";

export default function TaskTable({ tasks }) {
  const tableHeader = (
    <Table.Head>
      <Table.HeadCell className="w-6"></Table.HeadCell>
      <Table.HeadCell>Task name</Table.HeadCell>
      <Table.HeadCell className="w-24">Deadline</Table.HeadCell>
      <Table.HeadCell className="w-36">Status</Table.HeadCell>
    </Table.Head>
  );

  const tableRow = (task) => <TaskRow key={task.id} task={task} />;

  const tableBody = (
    <Table.Body className="divide-y">
      {tasks && sortById(tasks).map((task) => tableRow(task))}
    </Table.Body>
  );

  return (
    <Table>
      {tableHeader}
      {tableBody}
    </Table>
  );
}
