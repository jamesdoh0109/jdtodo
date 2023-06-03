import { useParams } from "react-router-dom";
import TaskTable from "../../components/Task/TaskTable";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { userDataActions } from "../../store/reducers/user-data";
import Loading from "../../components/common/Loading";

export default function ProjectDetail() {
  const id = useParams().projectId;
  const token = useSelector((state) => state.auth.token);
  const tasksForProjects = useSelector(
    (state) => state.userData.tasksForProjects
  );
  const tasksForCurrentProject = tasksForProjects?.find(
    (project) => project.id === id
  );

  const { isLoading, fetchData } = useFetch();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Project Detail rendered');
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
            userDataActions.setTasksForProjects({
              tasksForProjects: tasksForProjects
                ? [...tasksForProjects, { id: id, tasks: tasks }]
                : [{ id: id, tasks: tasks }],
            })
          );
        } catch (e) {
          console.log(e);
        }
      };

      const requestConfig = {
        url: `/api/${id}/tasks`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      fetchData(requestConfig, populateTasks);
    }
  }, [id, token, tasksForProjects, tasksForCurrentProject]);

  return (
    <div className="mt-12 w-full flex justify-center">
      <div className="w-5/6">
        {isLoading && <Loading />}
        {!isLoading && tasksForCurrentProject?.tasks.length === 0 && <>No tasks!</>}
        {!isLoading && tasksForCurrentProject?.tasks.length > 0 && <TaskTable />}
      </div>
    </div>
  );
}
