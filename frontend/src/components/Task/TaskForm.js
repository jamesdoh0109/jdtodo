import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/reducers/modal";
import { userDataActions } from "../../store/reducers/user-data";
import { formatDate } from "../../util/form";
import useFetch from "../../hooks/useFetch";
import Button from "../common/Button";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Message from "../common/Message";
import {
  taskFormMissingRequiredFields,
  taskNameTooLong,
} from "../../util/form";

export default function TaskForm({
  projectId,
  tasksForProjects,
  tasksForCurrentProject,
}) {
  const creatingNew = useSelector((state) => state.form.creatingNew);
  const taskToBeEdited = useSelector((state) => state.form.itemToBeEdited);
  const token = useSelector((state) => state.auth.token);

  const [form, setForm] = useState({
    name: taskToBeEdited ? taskToBeEdited.name : "",
    deadline: taskToBeEdited ? formatDate(taskToBeEdited.deadline) : "",
    description: taskToBeEdited ? taskToBeEdited.description : "",
    status: taskToBeEdited ? taskToBeEdited.status : "Not started",
  });

  console.log(form)

  const { status, setStatus, isLoading, fetchData } = useFetch();

  const dispatch = useDispatch();

  const displayNewTask = async (res) => {
    try {
      const data = await res.json();
      const newTask = {
        id: data.task.task_id,
        name: data.task.task_name,
        deadline: data.task.task_deadline,
        description: data.task.task_description,
        status: data.task.task_status,
        isDone: data.task.task_is_done,
      };
      const newTaskArray = {
        id: projectId,
        tasks: [...tasksForCurrentProject.tasks, newTask],
      };
      const filteredTasksForProjects = tasksForProjects.filter(
        (project) => project.id !== projectId
      );
      dispatch(
        userDataActions.setTasksForProjects({
          tasksForProjects: [...filteredTasksForProjects, newTaskArray],
        })
      );
      dispatch(modalActions.toggle());
    } catch (e) {
      console.log(e);
    }
  };

  const displayEditedTask = () => {};

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
    } else {
      submitForm();
    }
  };

  const submitForm = () => {
    const endpoint = `/api/${projectId}/tasks`;
    const requestConfig = {
      url: endpoint,
      method: creatingNew ? "POST" : "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(form),
    };
    fetchData(requestConfig, creatingNew ? displayNewTask : displayEditedTask);
  };

  const handleTaskChange = (e) => {
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  };

  const formTitle = (
    <h2 className="text-xl font-medium text-gray-900 dark:text-white">
      {creatingNew ? "Create a new task" : "Edit task"}
    </h2>
  );

  const formInput = (id, label, type, required) => (
    <>
      <div className="mb-1 block">
        <label htmlFor={id}>{label}</label>
      </div>
      {type !== "options" ? (
        <Input
          id={id}
          name={id}
          type={type}
          onChange={handleTaskChange}
          value={form[id]}
        />
      ) : (
        <select id={id} name={id} onChange={handleTaskChange} value={form.status}>
          <option value="Not started">Not started</option>
          <option value="In progress">In progress</option>
          <option value="Finished">Finished</option>
        </select>
      )}
    </>
  );

  const formInputGroup = (
    <div>
      {formInput("name", "Name", "text")}
      {formInput("deadline", "Deadline", "date")}
      {formInput("status", "Status", "options")}
      {formInput("description", "Description (optional)", "text")}
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
        dispatch(modalActions.toggle());
      }}
      isLoading={false}
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
