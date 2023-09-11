import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import {
  taskDeadlineValidator,
  taskDescriptionValidator,
  taskNameValidator,
} from "util/validator";
import { formatDateISO, handleCreateOrEdit } from "util/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutateData } from "hooks/useDataOperations";
import useStatus from "hooks/useStatus";
import * as yup from "yup";
import TaskModalTitle from "components/Task/TaskModalTitle";
import FormInput from "components/common/FormInput";
import ButtonSubmit from "components/common/Button/ButtonSubmit";
import ButtonCloseModal from "components/common/Button/ButtonCloseModal";
import Modal from "components/common/Modal";

import Message from "components/common/Message";

const taskInputs = [
  {
    label: "Name",
    name: "name",
    type: "text",
    id: "name",
  },
  {
    label: "Deadline",
    name: "deadline",
    type: "datetime-local",
    id: "deadline",
  },
  {
    label: "Status",
    name: "status",
    type: "select",
    id: "status",
  },
  {
    label: "Description (optional)",
    name: "description",
    type: "textarea",
    id: "description",
  },
];

export default function TaskForm() {
  const taskToBeEdited = useSelector((state) => state.taskForm.itemToBeEdited);
  const isCreatingNew = !taskToBeEdited.id;
  const projectId = useParams().projectId;

  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  const { status, setStatus } = useStatus();

  const requestConfig = {
    url: isCreatingNew
      ? `/api/${projectId}/tasks`
      : `/api/tasks/${taskToBeEdited.id}`,
    method: isCreatingNew ? "POST" : "PATCH",
  };

  const { mutate: createOrEditTask, isLoading } = useMutateData(
    requestConfig,
    handleCreateOrEdit(
      queryClient,
      ["tasks", projectId],
      (data) => ({
        id: data.task.task_id,
        name: data.task.task_name,
        deadline: data.task.task_deadline,
        status: data.task.task_status,
        description: data.task.task_description,
        isDone: data.task.task_status === "Finished",
      }),
      isCreatingNew,
      dispatch,
      "task",
      setStatus
    )
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: isCreatingNew ? null : taskToBeEdited.name,
      deadline: isCreatingNew ? null : formatDateISO(taskToBeEdited.deadline),
      description: isCreatingNew ? null : taskToBeEdited.description,
      status: isCreatingNew ? "Not started" : taskToBeEdited.status,
    },
    resolver: yupResolver(
      yup.object({
        name: taskNameValidator,
        deadline: taskDeadlineValidator,
        description: taskDescriptionValidator,
      })
    ),
    mode: "onChange",
  });

  return (
    <Modal>
      <form
        className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8"
        onSubmit={handleSubmit((data) => createOrEditTask(data))}
      >
        <TaskModalTitle isCreatingNew={isCreatingNew} />
        {taskInputs.map(({ id, name, type, label }) => (
          <FormInput
            key={id}
            id={id}
            name={name}
            type={type}
            label={label}
            errors={errors}
            register={register}
          />
        ))}
        <div className="w-full">
          {isCreatingNew ? (
            <ButtonSubmit
              text={isLoading ? "Creating" : "Create task"}
              disabled={isLoading || !isValid}
            />
          ) : (
            <ButtonSubmit
              text={isLoading ? "Editing" : "Edit task"}
              disabled={isLoading || !isValid}
            />
          )}
          <ButtonCloseModal
            disabled={isLoading}
            formResetRequired={{ required: !isCreatingNew, for: "task" }}
          />
          <Message
            messageObj={{
              message: status.message.toString(),
              error: status.error,
            }}
          />
        </div>
      </form>
    </Modal> 
  );
}
