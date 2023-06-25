import { createSlice } from "@reduxjs/toolkit";

const filterTasks = (tasksForCurrentProject, idToBeFiltered) =>
  tasksForCurrentProject.tasks.filter((task) => task.id !== idToBeFiltered);

// update parameter will be either new or edited project;
// update is not provided when deleting project
const updateProjectObject = (projectId, currentTasks, update) => ({
  id: projectId,
  tasks: update ? [...currentTasks, update] : currentTasks,
});

const updateProjectArray = (state, projectId, updatedProject) => {
  const filteredProject = state.tasksForAllProjects.filter(
    (project) => project.id !== projectId
  );
  state.tasksForAllProjects = [...filteredProject, updatedProject];
};

const createTask = (state, projectId, tasksForCurrentProject, newTask) => {
  const newTaskObj = {
    id: newTask.task_id,
    name: newTask.task_name,
    deadline: newTask.task_deadline,
    description: newTask.task_description,
    status: newTask.task_status,
    isDone: newTask.task_status === "Finished" ? true : false,
  };

  // project object containing the new task
  const projectWithNewTask = updateProjectObject(
    projectId,
    tasksForCurrentProject.tasks,
    newTaskObj
  );

  // update the array of project objs by first filtering out the current project
  // and re adding the project obj containing the new task
  updateProjectArray(state, projectId, projectWithNewTask);
};

const editTask = (
  state,
  projectId,
  tasksForCurrentProject,
  taskToBeEdited,
  editedTask
) => {
  // two types of edits: one using form and checkbox click
  const editedTaskObj = {
    id: taskToBeEdited,
    name: editedTask.name,
    deadline: editedTask.deadline,
    description: editedTask.description,
    status: editedTask.status,
    isDone: editedTask.isDone,
  };

  // update the tasks for the project by first filtering out the old task
  // and adding the updated version
  const filteredTasksWithoutEditedProject = filterTasks(
    tasksForCurrentProject,
    taskToBeEdited
  );
  const projectWithEditedTask = updateProjectObject(
    projectId,
    filteredTasksWithoutEditedProject,
    editedTaskObj
  );

  // update the array of project objs by first filtering out the current project
  // and re adding the project obj containing the new task
  updateProjectArray(state, projectId, projectWithEditedTask);
};

const deleteTask = (
  state,
  projectId,
  tasksForCurrentProject,
  taskToBeDeleted
) => {
  const filteredTasksWithoutDeletedProject = filterTasks(
    tasksForCurrentProject,
    taskToBeDeleted
  );
  const projectWithDeletedTask = updateProjectObject(
    projectId,
    filteredTasksWithoutDeletedProject
  );

  // update the array of project objs by first filtering out the current project
  // and re adding the project obj containing the new task
  updateProjectArray(state, projectId, projectWithDeletedTask);
};

const filterProjects = (projects, idToBeFiltered) =>
  projects.filter((project) => project.id !== idToBeFiltered);

const createProject = (state, projects, newProject) => {
  const newProjectObj = {
    id: newProject.proj_id,
    name: newProject.proj_name,
    dateCreated: newProject.date_created,
  };
  state.projects = [...projects, newProjectObj];
};

const editProject = (state, projects, projectToBeEdited, editedProject) => {
  const editedProjectObj = {
    id: editedProject.id,
    name: editedProject.name,
    dateCreated: editedProject.dateCreated,
  };
  const filteredProjectsWithoutEditedProject = filterProjects(
    projects,
    projectToBeEdited
  );
  state.projects = [...filteredProjectsWithoutEditedProject, editedProjectObj];
};

const deleteProject = (state, projects, projectToBeDeleted) => {
  const filteredProjectsWithoutDeletedProject = filterProjects(
    projects,
    projectToBeDeleted
  );
  state.projects = filteredProjectsWithoutDeletedProject;
};

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
    updateTasks(state, action) {
      const projectId = action.payload.projectId;
      const tasksForCurrentProject = action.payload.tasksForCurrentProject;
      switch (action.payload.type) {
        case "CREATE":
          createTask(
            state,
            projectId,
            tasksForCurrentProject,
            action.payload.newTask
          );
          break;
        case "EDIT":
          editTask(
            state,
            projectId,
            tasksForCurrentProject,
            action.payload.taskToBeEdited,
            action.payload.editedTask
          );
          break;
        case "DELETE":
          deleteTask(
            state,
            projectId,
            tasksForCurrentProject,
            action.payload.taskToBeDeleted
          );
          break;
        default:
          break;
      }
    },
    updateProjects(state, action) {
      const projects = action.payload.projects;
      switch (action.payload.type) {
        case "CREATE":
          createProject(state, projects, action.payload.newProject);
          break;
        case "EDIT":
          editProject(
            state,
            projects,
            action.payload.projectToBeEdited,
            action.payload.editedProject
          );
          break;
        case "DELETE":
          deleteProject(state, projects, action.payload.projectToBeDeleted);
          break;
        default:
          break;
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
