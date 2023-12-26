import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { deadlinePassed } from "util/form";
import { getSortedTasks } from "util/display";
import { useProjectDetailQuery } from "api/task/useProjectDetailQuery";
import TaskTable from "components/Task/TaskTable";
import Loading from "components/common/Loading";
import TaskForm from "components/Task/TaskForm";
import TaskDetail from "components/Task/TaskDetail";
import ButtonOpenModal from "components/common/Button/ButtonOpenModal";
import TaskSortBy from "components/Task/TaskSortBy";
import TaskOverdueWarningMessage from "components/Task/TaskOverdueWarningMessage";

export default function ProjectDetail() {
  const projectId = useParams().projectId;

  const { isLoading, data: tasks } = useProjectDetailQuery(projectId);

  const [currentSortBy, setCurrentSortBy] = useState("Sort By");

  const { modalOpen, modalType } = useSelector((state) => state.modal);

  const numOverdueTasks = useMemo(
    () =>
      tasks?.filter((task) => deadlinePassed(task.deadline) && !task.isDone)
        .length,
    [tasks]
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
