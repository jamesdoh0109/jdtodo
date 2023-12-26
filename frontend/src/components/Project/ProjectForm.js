import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useCreateOrEditProjectMutation } from "api/project/useCreateOrEditProjectMutation";
import { projectNameValidator } from "util/validator";
import { yupResolver } from "@hookform/resolvers/yup";
import useStatus from "hooks/useStatus";
import * as yup from "yup";
import ButtonSubmit from "components/common/Button/ButtonSubmit";
import Modal from "components/common/Modal";
import FormInput from "components/common/FormInput";
import ButtonCloseModal from "components/common/Button/ButtonCloseModal";
import Message from "components/common/Message";

export default function ProjectForm() {
  const projectToBeEdited = useSelector(
    (state) => state.projectForm.itemToBeEdited
  );
  const isCreatingNew = !projectToBeEdited.id;

  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  const { status, setStatus } = useStatus();

  const { mutate: createOrEditProject, isLoading } =
    useCreateOrEditProjectMutation(
      queryClient,
      dispatch,
      setStatus,
      projectToBeEdited,
      isCreatingNew
    );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { name: isCreatingNew ? null : projectToBeEdited.name },
    resolver: yupResolver(
      yup.object({
        name: projectNameValidator,
      })
    ),
    mode: "onChange",
  });

  return (
    <Modal>
      <form
        className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8"
        onSubmit={handleSubmit((data) => createOrEditProject(data))}
      >
        <h2 className="text-xl font-medium text-gray-900 dark:text-white">
          {isCreatingNew ? "Create a new project" : "Edit project"}
        </h2>
        <FormInput
          id="project-name"
          name="name"
          type="text"
          placeholder="e.g. final exam prep"
          errors={errors}
          register={register}
        />
        <div className="w-full">
          {isCreatingNew ? (
            <ButtonSubmit
              text={isLoading ? "Creating" : "Create project"}
              disabled={isLoading || !isValid}
            />
          ) : (
            <ButtonSubmit
              text={isLoading ? "Editing" : "Edit project"}
              disabled={isLoading || !isValid}
            />
          )}
          <ButtonCloseModal
            disabled={isLoading}
            formResetRequired={{ required: !isCreatingNew, for: "project" }}
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
