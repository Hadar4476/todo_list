import { takeLatest } from "redux-saga/effects";

import {
  initTasksSaga,
  postTaskSaga,
  changeStatusSaga,
  searchTasksSaga,
} from "./tasks";

export function* watchInitTasks() {
  yield takeLatest("tasks/initTasks", initTasksSaga);
}

export function* watchPostTask() {
  yield takeLatest("tasks/postTask", postTaskSaga);
}

export function* watchChangeStatus() {
  yield takeLatest("tasks/changeStatus", changeStatusSaga);
}

export function* watchSearchTasks() {
  yield takeLatest("tasks/searchTasks", searchTasksSaga);
}
