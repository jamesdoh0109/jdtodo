import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { deadlinePassed } from "../../util/form";
import { getSortedTasks } from "../../util/display";
import { useQueryData } from "../../hooks/useDataOperations";
import TaskTable from "../../components/Task/TaskTable";
import Loading from "../../components/common/Loading";
import TaskForm from "../../components/Task/TaskForm";
import TaskDetail from "../../components/Task/TaskDetail";
import ButtonOpenModal from "../../components/common/Button/ButtonOpenModal";
import TaskSortBy from "../../components/Task/TaskSortBy";
import TaskOverdueWarningMessage from "../../components/Task/TaskOverdueWarningMessage";

// do something about this 
function countOverdueTasks(tasks) {
  const overdueTasks = tasks.filter((task) => {
    return deadlinePassed(task.deadline) && !task.isDone;
  });
  return overdueTasks.length;
}

export default function ProjectDetail() {
  const token = useSelector((state) => state.auth.token);
  const modalOpen = useSelector((state) => state.modal.modalOpen);
  const modalType = useSelector((state) => state.modal.modalType);
  const projectId = useParams().projectId;

  const [currentSortBy, setCurrentSortBy] = useState("Sort By");

  const numOverdueTasks = 0;
  //tasks && countOverdueTasks(tasks);

  const requestConfig = {
    url: `/api/${projectId}/tasks`,
    token: token,
  };

  const select = (data) =>
    data.tasks.map((task) => ({
      id: task.task_id,
      name: task.task_name,
      deadline: task.task_deadline,
      status: task.task_status,
      description: task.task_description,
      isDone: task.task_status === "Finished",
    }));

  const { isLoading, data: tasks } = useQueryData(
    requestConfig,
    ["tasks", projectId],
    select
  );

  return (
    <div className="w-full flex justify-center">
      <div className="w-4/5">
        {modalOpen && modalType === "form" && <TaskForm />}
        {modalOpen && modalType === "details" && <TaskDetail />}
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            <div className="flex justify-between mb-2">
              <ButtonOpenModal btnTxt="Create new task" modalFor="task" />
              {tasks.length > 0 && (
                <TaskSortBy
                  currentSortBy={currentSortBy}
                  setCurrentSortBy={setCurrentSortBy}
                />
              )}
            </div>
            {numOverdueTasks > 0 && (
              <TaskOverdueWarningMessage numOverdueTasks={numOverdueTasks} />
            )}
            <TaskTable sortedTasks={getSortedTasks(tasks, currentSortBy)} />
          </>
        )}
      </div>
    </div>
  );
}
