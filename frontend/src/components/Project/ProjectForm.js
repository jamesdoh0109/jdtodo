import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useMutateData } from "hooks/useDataOperations";
import { onSuccessAfterSubmit } from "util/form";
import { projectNameValidator } from "util/validator";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ButtonSubmit from "components/common/Button/ButtonSubmit";
import Modal from "components/common/Modal";
import FormInput from "components/common/FormInput";
import ButtonCloseModal from "components/common/Button/ButtonCloseModal";

export default function ProjectForm() {
  const projectToBeEdited = useSelector(
    (state) => state.projectForm.itemToBeEdited
  );
  const isCreatingNew = projectToBeEdited.id === -1;

  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  const requestConfig = {
    url: `/api/projects${!isCreatingNew ? "/" + projectToBeEdited.id : ""}`,
    method: isCreatingNew ? "POST" : "PATCH",
  };

  const { mutate: createOrEditProject, isLoading } = useMutateData(
    requestConfig,
    onSuccessAfterSubmit(
      queryClient,
      ["projects"],
      (data) => ({
        id: data.project.proj_id,
        name: data.project.proj_name,
        dateUpdated: data.project.date_created,
      }),
      isCreatingNew,
      dispatch,
      "project"
    )
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { name: isCreatingNew ? "" : projectToBeEdited.name },
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
        </div>
      </form>
    </Modal>
  );
}
