import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userDataActions } from "../../store/reducers/user-data";
import { formActions } from "../../store/reducers/form";
import { modalActions } from "../../store/reducers/modal";
import useFetch from "../../hooks/useFetch";
import TaskTable from "../../components/Task/TaskTable";
import Loading from "../../components/common/Loading";
import Button from "../../components/common/Button";
import TaskForm from "../../components/Task/TaskForm";

export default function ProjectDetail() {
  const id = useParams().projectId;
  const token = useSelector((state) => state.auth.token);
  const modalOpen = useSelector((state) => state.modal.modalOpen);
  const tasksForAllProjects = useSelector(
    (state) => state.userData.tasksForAllProjects
  );
  const tasksForCurrentProject = tasksForAllProjects?.find(
    (project) => project.id === id
  );

  const { isLoading, fetchData } = useFetch();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect");
    if (!tasksForCurrentProject) {
      const populateTasks = async (res) => {
        try {
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
        } catch (e) {
          console.log(e);
        }
      };

      const requestConfig = {
        url: `api/${id}/tasks`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      fetchData(requestConfig, undefined, populateTasks);
    }
  }, [id, token, dispatch, tasksForAllProjects, tasksForCurrentProject]); // why does putting fetchData in dependency cause so much rerender

  const openCreateTaskModal = () => {
    dispatch(formActions.onCreate());
    dispatch(modalActions.toggle());
  };

  const createTaskButton = (
    <div className="mt-32">
      <Button text="Create new task" onClick={openCreateTaskModal} />
    </div>
  );

  const dashboardWithNoTasks = (
    <>
      {createTaskButton}
      <p className="mt-4">You currently don't have any tasks.</p>
    </>
  );

  const dashboardWithTasks = (
    <>
      {createTaskButton}
      <div className="mt-4">
        <TaskTable tasks={tasksForCurrentProject?.tasks} />
      </div>
    </>
  );

  return (
    <div className="w-full flex justify-center">
      <div className="w-4/5">
        {modalOpen && <TaskForm />}
        {isLoading && <Loading />}
        {!isLoading &&
          tasksForCurrentProject?.tasks.length === 0 &&
          dashboardWithNoTasks}
        {!isLoading &&
          tasksForCurrentProject?.tasks.length > 0 &&
          dashboardWithTasks}
      </div>
    </div>
  );
}
