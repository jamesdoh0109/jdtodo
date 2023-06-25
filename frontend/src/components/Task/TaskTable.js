import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  sortByDeadline,
  sortById,
  sortByName,
  sortByStatus,
} from "../../util/display";
import { Table } from "flowbite-react";
import TaskRow from "./TaskRow";

export default function TaskTable({ tasks, sortBy }) {
  const dropdownId = useSelector((state) => state.dropdown.dropdownId);
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

  const tableRow = (task, dropdownId, isDesktopVersion) => {
    return <TaskRow key={task.id} task={task} dropdownId={dropdownId} isDesktopVersion={isDesktopVersion} />
  };

  const getSortedTasks = () => {
    if (sortBy === "Sort By") {
      return sortById(tasks);
    } else if (sortBy === "Deadline") {
      return sortByDeadline(tasks);
    } else if (sortBy === "Name") {
      return sortByName(tasks);
    } else {
      return sortByStatus(tasks);
    }
  };
  
  const desktopTableHeader = (
    <Table.Head>
      <Table.HeadCell className="w-6"></Table.HeadCell>
      <Table.HeadCell>Task name</Table.HeadCell>
      <Table.HeadCell className="w-24">Deadline</Table.HeadCell>
      <Table.HeadCell className="w-36">Status</Table.HeadCell>
      <Table.HeadCell className="w-6"></Table.HeadCell>
    </Table.Head>
  );

  const desktopTableBody = (
    <Table.Body className="divide-y">
      {tasks && getSortedTasks().map((task) => tableRow(task, dropdownId, isDesktopVersion))}
    </Table.Body>
  );

  const desktopTable = (
    <Table>
      {desktopTableHeader}
      {desktopTableBody}
    </Table>
  );

  const mobleTable = (
    <ul>
      {tasks && getSortedTasks().map((task) => tableRow(task, dropdownId, isDesktopVersion))}
    </ul>
  );

  return isDesktopVersion ? desktopTable : mobleTable;
}
