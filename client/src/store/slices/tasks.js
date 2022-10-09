const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
};

const initTasks = (state) => {
  state.isLoading = true;
  state.error = null;
};

const initTasksSuccess = (state, action) => {
  state.isLoading = false;
  state.tasks = action.payload;
};

const initTasksFail = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const postTask = (state) => {
  state.isLoading = true;
  state.error = null;
};

const postTaskSuccess = (state, action) => {
  state.isLoading = false;
  state.tasks.push(action.payload);
};

const postTaskFail = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const changeStatus = (state) => {
  state.isLoading = true;
  state.error = null;
};

const changeStatusSuccess = (state, action) => {
  state.isLoading = false;

  const { id } = action.payload;
  const taskInTasks = state.tasks.findIndex((t) => t.id === id);

  state.tasks[taskInTasks] = action.payload;
};

const changeStatusFail = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const searchTasks = (state, action) => {
  state.isLoading = true;
  state.error = null;
};

const searchTasksSuccess = (state, action) => {
  state.isLoading = false;
  state.tasks = action.payload;
};

const searchTasksFail = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    initTasks,
    initTasksSuccess,
    initTasksFail,
    postTask,
    postTaskSuccess,
    postTaskFail,
    changeStatus,
    changeStatusSuccess,
    changeStatusFail,
    searchTasks,
    searchTasksSuccess,
    searchTasksFail,
  },
});

export default tasksSlice;
