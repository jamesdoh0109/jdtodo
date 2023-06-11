import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/reducers/modal";
import { formatDate } from "../../util/display";
import Modal from "../common/Modal";
import Button from "../common/Button";
import StatusBadge from "./StatusBadge";

export default function TaskDetail() {
  const taskToBeShown = useSelector((state) => state.form.itemToBeEdited);

  const dispatch = useDispatch();

  const taskName = (
    <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
      {taskToBeShown.name}
    </h2>
  );

  const taskStatus = (
    <div>
      <h3 className="italic">Status</h3>
      <StatusBadge status={taskToBeShown.status} forTaskDetail={true} />
    </div>
  );

  const taskDeadline = (
    <div>
      <hr className="mb-4" />
      <h3 className="italic">Deadline</h3>
      {formatDate(taskToBeShown.deadline)}
    </div>
  );

  const taskDescription = (
    <div>
      <h3 className="italic">Description</h3>
      {taskToBeShown.description
        ? taskToBeShown.description
        : "This task has no description."}
    </div>
  );

  const editButton = (
    <Button
      text="Edit"
      onClick={() => {
        dispatch(
          modalActions.toggle({
            modalOpen: true,
            modalType: "form",
          })
        );
      }}
      isLoading={false}
    />
  );

  const closeButton = (
    <Button
      text="Close"
      onClick={() => {
        dispatch(
          modalActions.toggle({
            modalOpen: false,
            modalType: "",
          })
        );
      }}
      isLoading={false}
    />
  );

  const formButtons = (
    <div className="w-full">
      {editButton}
      {closeButton}
    </div>
  );

  return (
    <Modal>
      <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
        {taskName}
        {taskDeadline}
        {taskStatus}
        {taskDescription}
        {formButtons}
      </div>
    </Modal>
  );
}
