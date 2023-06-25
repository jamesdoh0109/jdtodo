import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/reducers/modal";
import { userDataActions } from "../../store/reducers/user-data";
import {
  formatDateISO,
  getUserTimeZone,
  taskDescriptionTooLong,
  taskFormMissingRequiredFields,
  taskNameTooLong,
} from "../../util/form";
import useFetch from "../../hooks/useFetch";
import Button from "../common/Button";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Message from "../common/Message";

export default function TaskForm() {
  const id = useParams().projectId;
  const token = useSelector((state) => state.auth.token);
  const creatingNew = useSelector((state) => state.form.creatingNew);
  const taskToBeEdited = useSelector((state) => state.form.itemToBeEdited);

  const tasksForAllProjects = useSelector(
    (state) => state.userData.tasksForAllProjects
  );
  const tasksForCurrentProject = tasksForAllProjects?.find(
    (project) => project.id === id
  );

  // if we're creating a new task, set form values to be empty strings and "Not started" for status
  const [form, setForm] = useState({
    name: taskToBeEdited ? taskToBeEdited.name : "",
    deadline: taskToBeEdited ? formatDateISO(taskToBeEdited.deadline) : "",
    description: taskToBeEdited ? taskToBeEdited.description : "",
    status: taskToBeEdited ? taskToBeEdited.status : "Not started",
  });

  const { status, setStatus, isLoading, fetchData } = useFetch();

  const dispatch = useDispatch();

  const closeModalAfterSubmit = () => {
    dispatch(
      modalActions.toggle({
        modalOpen: false,
        modalType: "",
      })
    );
  };

  const displayNewTask = async (res) => {
    try {
      const data = await res.json();
      dispatch(
        userDataActions.updateTasks({
          type: "CREATE",
          newTask: data.task,
          projectId: id,
          tasksForCurrentProject: tasksForCurrentProject,
        })
      );
      closeModalAfterSubmit();
    } catch (e) {
      console.log(e);
    }
  };

  const displayEditedTask = () => {
    dispatch(
      userDataActions.updateTasks({
        type: "EDIT",
        taskToBeEdited: taskToBeEdited.id,
        editedTask: { ...form, isDone: form.status === "Finished" },
        projectId: id,
        tasksForCurrentProject: tasksForCurrentProject,
      })
    );
    closeModalAfterSubmit();
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (taskFormMissingRequiredFields(form.name, form.deadline, form.status)) {
      setStatus({
        error: true,
        message: "Please fill out the required fields.",
      });
    } else if (taskNameTooLong(form.name.trim())) {
      setStatus({
        error: true,
        message: "Name must be less than 60 characters.",
      });
    } else if (taskDescriptionTooLong(form.description.trim())) {
      setStatus({
        error: true,
        message: "Description must be less than 300 characters.",
      });
    } else {
      submitForm();
    }
  };

  const submitForm = () => {
    const endpoint = creatingNew
      ? `/api/${id}/tasks`
      : `/api/tasks/${taskToBeEdited.id}`;
    const requestConfig = {
      url: endpoint,
      method: creatingNew ? "POST" : "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        ...form,
        is_done: form.status === "Finished",
        user_time_zone: getUserTimeZone(),
      }),
    };
    fetchData(
      requestConfig,
      !creatingNew && displayEditedTask,
      creatingNew && displayNewTask
    );
  };

  const handleTaskChange = (e) => {
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  };

  const formTitle = (
    <h2 className="text-xl font-medium text-gray-900 dark:text-white">
      {creatingNew ? "Create a new task" : "Edit task"}
    </h2>
  );

  const formInput = (id, label, type) => (
    <>
      <div className="mt-3 block">
        <label htmlFor={id}>{label}</label>
      </div>
      <Input
        id={id}
        name={id}
        type={type}
        onChange={handleTaskChange}
        value={form[id]}
      />
    </>
  );

  const formInputGroup = (
    <div>
      {formInput("name", "Name", "text")}
      {formInput("deadline", "Deadline", "datetime-local")}
      {formInput("status", "Status", "select")}
      {formInput("description", "Description (optional)", "textarea")}
    </div>
  );

  const createButton = (
    <Button
      text={isLoading ? "Creating" : "Create task"}
      submit={true}
      isLoading={isLoading}
    />
  );

  const editButton = (
    <Button
      text={isLoading ? "Editing" : "Edit task"}
      submit={true}
      isLoading={isLoading}
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
      isLoading={isLoading}
      color="slate"
    />
  );

  const formButtons = (
    <div className="w-full">
      {creatingNew ? createButton : editButton}
      {closeButton}
    </div>
  );

  return (
    <Modal>
      {status.error && <Message errorMsg={status.message} />}
      <form onSubmit={handleOnSubmit}>
        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          {formTitle}
          {formInputGroup}
          {formButtons}
        </div>
      </form>
    </Modal>
  );
}
