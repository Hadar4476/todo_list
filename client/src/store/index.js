import { configureStore } from "@reduxjs/toolkit";

import tasksSlice from "./slices/tasks";

import createSagaMiddleware from "redux-saga";
import {
  watchInitTasks,
  watchPostTask,
  watchChangeStatus,
  watchSearchTasks,
} from "./sagas";

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
  },
  middleware: [saga],
});

saga.run(watchInitTasks);
saga.run(watchPostTask);
saga.run(watchChangeStatus);
saga.run(watchSearchTasks);

export const globalActions = {
  tasks: tasksSlice.actions,
};

export default store;
