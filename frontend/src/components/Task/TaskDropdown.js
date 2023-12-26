import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteTaskMutation } from "api/task/useDeleteTaskMutation";
import { dropdownActions } from "store/reducers/dropdown";
import { taskFormActions } from "store/reducers/taskForm";
import { modalActions } from "store/reducers/modal";
import { ListGroup } from "flowbite-react";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TaskDropdown({
  task,
  onMouseLeave,
  onMouseEnter,
  dropdownId,
}) {
  const taskId = task.id;
  const projectId = useParams().projectId;

  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  const { mutate: deleteTask } = useDeleteTaskMutation(
    queryClient,
    taskId,
    projectId
  );

  const toggleDropdown = () => {
    const newDropdownId = dropdownId === taskId ? -1 : taskId;
    dispatch(dropdownActions.toggleDropdown({ dropdownId: newDropdownId }));
  };

  const handleOnEdit = (e) => {
    e.stopPropagation();
    dispatch(
      taskFormActions.onEdit({
        itemToBeEdited: {
          id: taskId,
          name: task.name,
          deadline: task.deadline,
          description: task.description,
          status: task.status,
        },
      })
    );
    dispatch(
      modalActions.toggle({
        modalOpen: true,
        modalType: "form",
      })
    );
    dispatch(
      dropdownActions.toggleDropdown({
        dropdownId: -1,
      })
    );
  };

  const handleOnDelete = (e) => {
    e.stopPropagation();
    deleteTask();
  };

  return (
    <div className="relative">
      <FontAwesomeIcon
        icon={faEllipsisH}
        className="cursor-pointer w-4"
        onClick={(e) => {
          // prevent modal popup
          e.stopPropagation();
          toggleDropdown();
        }}
      />
      {dropdownId !== -1 && dropdownId === taskId && (
        <div
          className="absolute z-50 mt-2"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <ListGroup>
            <ListGroup.Item onClick={handleOnEdit}>Edit</ListGroup.Item>
            <ListGroup.Item onClick={handleOnDelete}>Delete</ListGroup.Item>
          </ListGroup>
        </div>
      )}
    </div>
  );
}
