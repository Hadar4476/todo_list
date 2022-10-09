import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { globalActions } from "../../store";
import useHttp from "../../hooks/use-http";
import useWindow from "../../hooks/use-window";
import { url } from "../../my-axios";

import { Transition } from "react-transition-group";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";

import CustomSelect from "../UI/CustomSelect/CustomSelect";
import Icon from "../UI/Icon/Icon";
import Button from "../UI/Button/Button";
import CustomInput from "../UI/CustomInput/CustomInput";
import Task from "./Task/Task";
import NewTask from "../NewTask/NewTask";
import Backdrop from "../UI/Backdrop/Backdrop";
import Modal from "../UI/Modal/Modal";

import classes from "./Tasks.module.scss";

const Tasks = () => {
  const { tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const { sendRequest } = useHttp();
  const { isMobile } = useWindow();

  const sortByOptions = useMemo(() => {
    return [
      { value: "createdAt", text: "By created date" },
      { value: "updatedAt", text: "By updated date" },
      { value: "done", text: "By status done" },
      { value: "undone", text: "By status undone" },
      { value: "paused", text: "By status paused" },
      { value: "inProgress", text: "By status in progress" },
    ];
  }, []);

  const [sortByValue, setSortByValue] = useState("createdAt");

  const [searchInput, setSearchInput] = useState({
    value: "",
    error: "",
    isValid: false,
  });

  const { value: searchValue } = searchInput;

  const [statuses, setStatuses] = useState([]);

  const [shouldDisplayAddModal, setShouldDisplayAddModal] = useState(false);

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((curr, next) => {
      const status = statuses.find((s) => s.value === sortByValue);

      if (status) {
        const first = curr.statusId === status._id ? 1 : 0;
        const second = next.statusId === status._id ? 1 : 0;

        if (first > second) {
          return -1;
        }
        if (first < second) {
          return 1;
        }
        return 0;
      }

      return new Date(next[sortByValue]) - new Date(curr[sortByValue]);
    });
  }, [tasks, sortByValue, statuses]);

  useEffect(() => {
    dispatch(globalActions.tasks.initTasks());
  }, [dispatch]);

  useEffect(() => {
    if (!statuses.length) {
      const initStatuses = (statuses) => {
        setStatuses(statuses);
      };

      const requestConfig = {
        method: "get",
        url: `${url}/statuses`,
      };

      sendRequest(requestConfig, initStatuses);
    }
  }, [sendRequest, statuses]);

  const onSortByOptionChange = useCallback(
    ({ target }) => {
      const { value } = target;
      const isValid = sortByOptions.some((o) => o.value === value);

      if (!isValid) {
        return;
      }

      setSortByValue(value);
    },
    [sortByOptions]
  );

  const onSearchValueChange = useCallback(
    ({ target }) => {
      const { value } = target;
      const trimmedValue = value.trim();

      if (!trimmedValue && !sortedTasks.length) {
        dispatch(globalActions.tasks.initTasks());
      }

      setSearchInput((prevState) => {
        const updatedObject = { ...prevState };
        updatedObject.value = value;
        updatedObject.error = "";
        updatedObject.isValid = true;

        return updatedObject;
      });
    },
    [dispatch, sortedTasks]
  );

  const onSearchTasks = useCallback(() => {
    const trimmedValue = searchValue.trim();

    if (!trimmedValue) {
      setSearchInput((prevState) => {
        const updatedObject = { ...prevState };
        updatedObject.error = "Please search with a valid value";
        updatedObject.isValid = false;

        return updatedObject;
      });

      return;
    }

    dispatch(globalActions.tasks.searchTasks(trimmedValue));
  }, [dispatch, searchValue]);

  const onDisplayAddTaskModal = useCallback(() => {
    setShouldDisplayAddModal(true);
  }, []);

  const onHideAddTaskModal = useCallback(() => {
    setShouldDisplayAddModal(false);
  }, []);

  const tasksRenderer = sortedTasks.length ? (
    <ul className={classes.list}>
      {sortedTasks.map((t) => {
        return (
          <Task
            key={t._id}
            id={t._id}
            title={t.title}
            description={t.description}
            statusId={t.statusId}
            createDate={t.createdAt}
            updateDate={t.updatedAt}
          />
        );
      })}
    </ul>
  ) : (
    <span className={classes["no-tasks"]}>No tasks found</span>
  );

  const shouldDisableSearchBtn = !Boolean(searchValue.trim());

  const searchButtonRenderer = isMobile ? (
    <Icon
      icon={faSearch}
      className={classes["search-icon"]}
      emitClick={onSearchTasks}
    />
  ) : (
    <Button
      text="Search"
      className={classes["search-btn"]}
      disable={shouldDisableSearchBtn}
      emitClick={onSearchTasks}
    />
  );

  const searchErrorRenderer = searchInput.error && !searchInput.isValid && (
    <span className={classes["search-error"]}>{searchInput.error}</span>
  );

  const addTaskRenderer = !searchValue && (
    <Fragment>
      <div
        className={classes["add-task-wrapper"]}
        onClick={onDisplayAddTaskModal}
      >
        <Button text="Add new task" className={classes["add-task-btn"]} />
        <Icon icon={faPlus} className={classes["add-task-icon"]} />
      </div>
      <Transition
        in={shouldDisplayAddModal}
        timeout={400}
        mountOnEnter
        unmountOnExit
        children={(state) => (
          <Fragment>
            <Modal displayState={state}>
              <NewTask emitCloseModal={onHideAddTaskModal} />
            </Modal>
            <Backdrop displayState={state} emitClick={onHideAddTaskModal} />
          </Fragment>
        )}
      />
    </Fragment>
  );

  return (
    <div className={classes.tasks}>
      <h1 className={classes.title}>To do list</h1>
      <div className={classes["sort-by"]}>
        <span className={classes.title}>Sort</span>
        <CustomSelect
          id="task_sort_by"
          name="task_sort_by"
          value={sortByValue}
          options={sortByOptions}
          optionValue="value"
          optionText="text"
          className={classes["sort-by-select"]}
          emitSelect={onSortByOptionChange}
        />
      </div>
      <div className={classes["search-wrapper"]}>
        <div
          className={`${classes.search} ${
            searchInput.error && !searchInput.isValid && classes.invalid
          }`}
        >
          <CustomInput
            type="text"
            value={searchInput.value}
            id="search"
            name="search"
            placeholder="Search by title, description or comment"
            className={classes.input}
            emitChange={onSearchValueChange}
          />
          {searchButtonRenderer}
        </div>
        {searchErrorRenderer}
      </div>
      {addTaskRenderer}
      {tasksRenderer}
    </div>
  );
};

export default Tasks;
