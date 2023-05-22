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
  const projects = useSelector((state) => state.userData.projects);
  const currentProject = projects?.find((project) => project.id == id);
  const tasks = currentProject?.tasks;
  

  const { isLoading, fetchData } = useFetch();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!projects) {
      
    }
    if (!tasks) {
      console.log('d')
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
          const filteredProjects = projects.filter(
            (project) => project.id != id
          );
          dispatch(
            userDataActions.setProjects({
              projects: [
                ...filteredProjects,
                { ...currentProject, tasks: tasks },
              ],
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
  }, []);

  return (
    <div className="mt-12 w-full flex justify-center">
      <div className="w-5/6">
        {isLoading && <Loading />}
        {!isLoading && tasks?.length === 0 && <>No tasks!</>}
        {!isLoading && tasks?.length > 0 && <TaskTable />}
        
      </div>
    </div>
  );
}
