import { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import TaskRow from "./TaskRow";

export default function TaskTable({ sortedTasks }) {
  const [isDesktopVersion, setIsDesktopVersion] = useState(
    window.innerWidth > 550
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopVersion(window.innerWidth > 550);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const taskList = sortedTasks.map((task) => (
    <TaskRow key={task.id} task={task} isDesktopVersion={isDesktopVersion} />
  ));

  if (sortedTasks.length > 0) {
    return (
      <div className="mt-2 pb-12">
        {isDesktopVersion ? (
          <Table>
            <Table.Head>
              <Table.HeadCell className="w-6"></Table.HeadCell>
              <Table.HeadCell>Task name</Table.HeadCell>
              <Table.HeadCell className="w-24">Deadline</Table.HeadCell>
              <Table.HeadCell className="w-36">Status</Table.HeadCell>
              <Table.HeadCell className="w-6"></Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">{taskList}</Table.Body>
          </Table>
        ) : (
          <ul>{taskList}</ul>
        )}
      </div>
    );
  } else {
    return (
      <p className="mt-4">This project currently doesn't have any tasks.</p>
    );
  }
}
