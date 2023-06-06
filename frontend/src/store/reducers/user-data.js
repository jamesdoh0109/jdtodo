import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    id: -1,
    firstname: "",
    lastname: "",
    email: "",
    projects: null,
    tasksForAllProjects: null,
  },
  reducers: {
    setId(state, action) {
      state.id = action.payload.id;
    },
    setFirstname(state, action) {
      state.firstname = action.payload.firstname;
    },
    setLastname(state, action) {
      state.lastname = action.payload.lastname;
    },
    setEmail(state, action) {
      state.email = action.payload.email;
    },
    // TODO: simplify and add updateProjects functionality
    updateTasks(state, action) {
      let data, task, projectId, tasksForCurrentProject, taskToBeEdited, form;
      switch (action.payload.type) {
        case "CREATE":
          ({ data, projectId, tasksForCurrentProject } = action.payload);
          try {
            const newTask = {
              id: data.task.task_id,
              name: data.task.task_name,
              deadline: data.task.task_deadline,
              description: data.task.task_description,
              status: data.task.task_status,
              isDone: data.task.task_status === "Finished" ? true : false,
            };

            // project object containing the new task
            const projectWithNewTask = {
              id: projectId,
              tasks: [...tasksForCurrentProject.tasks, newTask],
            };

            // update the array of project objs by first filtering out the current project
            // and re adding the project obj containing the new task
            const filteredProjectArray = state.tasksForAllProjects.filter(
              (project) => project.id !== projectId
            );
            state.tasksForAllProjects = [
              ...filteredProjectArray,
              projectWithNewTask,
            ];
          } catch (e) {
            console.log(e);
          }
          return;
        case "EDIT":
          ({ taskToBeEdited, task, form, projectId, tasksForCurrentProject } =
            action.payload);
          try {
            // two types of edits: one using form and checkbox click
            const editedTask = form
              ? {
                  id: taskToBeEdited,
                  name: form.name,
                  deadline: form.deadline,
                  description: form.description,
                  status: form.status,
                  isDone: form.is_done,
                }
              : {
                  id: taskToBeEdited,
                  name: task.name,
                  deadline: task.deadline,
                  description: task.description,
                  status: task.isDone ? "Not started" : "Finished",
                  isDone: !task.isDone,
                };

            // update the tasks for the project by first filtering out the old task
            // and adding the updated version
            const filteredTasks = tasksForCurrentProject.tasks.filter(
              (task) => task.id !== taskToBeEdited
            );
            const projectWithUpdatedTask = {
              id: projectId,
              tasks: [...filteredTasks, editedTask],
            };

            // update the array of project objs by first filtering out the current project
            // and re adding the project obj containing the new task
            const filteredProjectArray = state.tasksForAllProjects.filter(
              (project) => project.id !== projectId
            );
            state.tasksForAllProjects = [
              ...filteredProjectArray,
              projectWithUpdatedTask,
            ];
          } catch (e) {
            console.log(e);
          }
          return;
        default:
          return;
      }
    },
    updateProjects(state, action) {
      switch (action.type) {
        case "CREATE":
          return;
        case "EDIT":
          return;
        default:
          return;
      }
    },
    setProjects(state, action) {
      state.projects = action.payload.projects;
    },
    setTasksForAllProjects(state, action) {
      state.tasksForAllProjects = action.payload.tasksForAllProjects;
    },
  },
});

export const initialUserDataFetchFromBrowswer = () => {
  return (dispatch) => {
    const user = localStorage.getItem("user");
    if (user) {
      const formattedUser = JSON.parse(user);
      dispatch(
        userDataActions.setId({
          id: formattedUser.id,
        })
      );
      dispatch(
        userDataActions.setFirstname({
          firstname: formattedUser.firstname,
        })
      );
      dispatch(
        userDataActions.setLastname({
          lastname: formattedUser.lastname,
        })
      );
      dispatch(
        userDataActions.setEmail({
          email: formattedUser.email,
        })
      );
    }
  };
};

export const userDataActions = userDataSlice.actions;
export default userDataSlice.reducer;
