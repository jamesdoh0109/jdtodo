import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userDataActions } from "../../store/reducers/user-data";
import { formActions } from "../../store/reducers/form";
import { modalActions } from "../../store/reducers/modal";
import { Dropdown } from "flowbite-react";
import useFetch from "../../hooks/useFetch";
import TaskTable from "../../components/Task/TaskTable";
import Loading from "../../components/common/Loading";
import Button from "../../components/common/Button";
import TaskForm from "../../components/Task/TaskForm";
import TaskDetail from "../../components/Task/TaskDetail";
import Error from "../../components/common/Error";
import { dropdownActions } from "../../store/reducers/dropdown";

export default function ProjectDetail() {
  const id = useParams().projectId;
  const token = useSelector((state) => state.auth.token);
  const modalOpen = useSelector((state) => state.modal.modalOpen);
  const modalType = useSelector((state) => state.modal.modalType);
  const tasksForAllProjects = useSelector(
    (state) => state.userData.tasksForAllProjects
  );
  const tasksForCurrentProject = tasksForAllProjects?.find(
    (project) => project.id === id
  );

  const [currentSortBy, setCurrentSortBy] = useState("Sort By");

  const { status, setStatus, isLoading, fetchData } = useFetch();

  const dispatch = useDispatch();

  useEffect(() => {
    const handleError = (e) => {
      setStatus({
        error: true,
        message: e,
      });
    };

    const populateTasks = async (res) => {
      try {
        if (res.status === 400) {
          handleError("Project does not exist.");
        } else if (res.status === 401) {
          handleError("Access forbidden");
        } else {
          const data = await res.json();
          const tasks = data.tasks.map((task) => ({
            id: task.task_id,
            name: task.task_name,
            deadline: task.task_deadline,
            status: task.task_status,
            description: task.task_description,
            isDone: task.task_is_done,
          }));
          dispatch(
            userDataActions.setTasksForAllProjects({
              tasksForAllProjects: tasksForAllProjects
                ? [...tasksForAllProjects, { id: id, tasks: tasks }]
                : [{ id: id, tasks: tasks }],
            })
          );
        }
      } catch (e) {
        handleError(e);
      }
    };

    if (!tasksForCurrentProject) {
      const requestConfig = {
        url: `/api/${id}/tasks`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      };
      fetchData(requestConfig, undefined, populateTasks);
    }
  }, [
    id,
    token,
    tasksForCurrentProject,
    tasksForAllProjects,
    dispatch,
    setStatus,
    fetchData,
  ]);

  const openCreateTaskModal = () => {
    dispatch(formActions.onCreate());
    dispatch(modalActions.toggle({
      modalOpen: true,
      modalType: 'form'
    }));
    dispatch(
      dropdownActions.toggleDropdown({
        dropdownId: -1,
      })
    );
  };

  const sortBy = (
    <div className="mt-32 border-solid border border-slate-500 rounded-md px-3 py-2">
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

  const createTaskButton = (
    <div className="mt-32">
      <Button text="Create new task" onClick={openCreateTaskModal} />
    </div>
  );

  const dashboardWithNoTasks = (
    <>
      {createTaskButton}
      <p className="mt-4">This project currently doesn't have any tasks.</p>
    </>
  );

  const dashboardWithTasks = (
    <>
      <div className="flex justify-between">
        {createTaskButton}
        {sortBy}
      </div>

      <div className="mt-4">
        <TaskTable
          tasks={tasksForCurrentProject?.tasks}
          sortBy={currentSortBy}
        />
      </div>
    </>
  );

  return (
    <div className="w-full flex justify-center">
      <div className="w-4/5">
        {modalOpen && modalType === "form" && <TaskForm />}
        {modalOpen && modalType === "details" && <TaskDetail />}
        {isLoading && <Loading />}
        {!isLoading &&
          tasksForCurrentProject?.tasks.length === 0 &&
          dashboardWithNoTasks}
        {!isLoading &&
          tasksForCurrentProject?.tasks.length > 0 &&
          dashboardWithTasks}
        {status.error && <Error error={status.message} />}
      </div>
    </div>
  );
}
