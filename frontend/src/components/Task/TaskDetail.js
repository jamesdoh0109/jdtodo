import { useSelector } from "react-redux";
import { formatDate } from "util/display";
import { deadlinePassed } from "util/form";
import Modal from "components/common/Modal";
import TaskStatusBadge from "components/Task/TaskStatusBadge";
import ButtonCloseModal from "components/common/Button/ButtonCloseModal";
import TaskModalTitle from "components/Task/TaskModalTitle";
import ButtonOpenModal from "components/common/Button/ButtonOpenModal";

export default function TaskDetail() {
  const taskToBeShown = useSelector((state) => state.taskDetail.itemToBeShown);

  return (
    <Modal>
      <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
        <TaskModalTitle taskName={taskToBeShown.name} />
        <div>
          <hr className="mb-4" />
          <h3 className="italic">Deadline</h3>
          {formatDate(
            taskToBeShown.deadline,
            true // show time
          )}
        </div>
        <div>
          <h3 className="italic">Status</h3>
          <TaskStatusBadge
            taskStatus={taskToBeShown.status}
            forTaskDetail={true}
          />
          {/* show Overdue badge if deadline is passed and task isn't done */}
          {deadlinePassed(taskToBeShown.deadline) && !taskToBeShown.isDone && (
            <TaskStatusBadge taskStatus="Overdue" forTaskDetail={true} />
          )}
        </div>
        <div>
          <h3 className="italic">Description</h3>
          {taskToBeShown.description
            ? taskToBeShown.description
            : "This task has no description."}
        </div>
        <div className="w-full">
          <ButtonOpenModal btnTxt="Edit" modalFor="task" color="blue" />
          <ButtonCloseModal
            formResetRequired={{ required: true, for: "task" }}
            color="slate"
          />
        </div>
      </div>
    </Modal>
  );
}
