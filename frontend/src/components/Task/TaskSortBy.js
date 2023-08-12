import { Dropdown } from "flowbite-react";

export default function TaskSortBy({ currentSortBy, setCurrentSortBy }) {
  return (
    <div className="l-lg-h:mt-32 l-md-h:mt-24 l-sm-h:mt-16 border-solid border border-slate-500 rounded-md px-3 py-2">
      <Dropdown inline label={currentSortBy}>
        <Dropdown.Item onClick={() => setCurrentSortBy("Deadline")}>
          Deadline
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setCurrentSortBy("Name")}>
          Name
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setCurrentSortBy("Status")}>
          Status
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
}
