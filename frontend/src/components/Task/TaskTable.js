import { Table, Checkbox } from "flowbite-react";
import StatusBadge from "./StatusBadge";

export default function TaskTable() {
  return (
    <Table>
      <Table.Head>
        <Table.HeadCell></Table.HeadCell>
        <Table.HeadCell className="w-3/4">Task name</Table.HeadCell>
        <Table.HeadCell>Deadline</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
           <Checkbox onClick={() => console.log('clicked')}/>
          </Table.Cell>
          <Table.Cell>asd d dad adasd ad da dad dasdad</Table.Cell>
          <Table.Cell>Laptop</Table.Cell>
          <Table.Cell>
            <a
              href="/tables"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              <StatusBadge status="Complete" />
            </a>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
