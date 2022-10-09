import { put, all } from "redux-saga/effects";
import axios from "../../my-axios";

import tasksSlice from "../slices/tasks";

export function* initTasksSaga() {
  try {
    const { data } = yield axios.get("/tasks");

    yield all([yield put(tasksSlice.actions.initTasksSuccess(data))]);
  } catch (error) {
    yield put(tasksSlice.actions.initTasksFail(error));
  }
}

export function* postTaskSaga(action) {
  try {
    const task = action.payload;
    const { data } = yield axios.post("/tasks", task);

    yield all([yield put(tasksSlice.actions.postTaskSuccess(data))]);
  } catch (error) {
    yield put(tasksSlice.actions.postTaskFail(error));
  }
}

export function* changeStatusSaga(action) {
  try {
    const { taskId, statusId } = action.payload;
    const { data } = yield axios.put("/tasks/changeStatus", {
      taskId,
      statusId,
    });

    yield all([yield put(tasksSlice.actions.changeStatusSuccess(data))]);
  } catch (error) {
    yield put(tasksSlice.actions.changeStatusFail(error));
  }
}

export function* searchTasksSaga(action) {
  try {
    const by = action.payload;
    const { data } = yield axios.get("/tasks/searchTasks", { params: { by } });

    yield all([yield put(tasksSlice.actions.searchTasksSuccess(data))]);
  } catch (error) {
    yield put(tasksSlice.actions.searchTasksFail(error));
  }
}
