import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useHttp from "../../hooks/use-http";
import { url } from "../../my-axios";
import { globalActions } from "../../store";
import { formatCamelCase } from "../../utils/string";

import Button from "../UI/Button/Button";
import CustomSelect from "../UI/CustomSelect/CustomSelect";
import CustomInput from "../UI/CustomInput/CustomInput";

import classes from "./NewTask.module.scss";

const NewTask = (props) => {
  const { emitCloseModal } = props;

  const dispatch = useDispatch();

  const [statusOptions, setStatusOptions] = useState([]);

  const form = {
    title: {
      value: "",
      error: "",
      isValid: false,
    },
    description: {
      value: "",
      error: "",
      isValid: false,
    },
    statusId: {
      value: "",
      error: "",
      isValid: false,
    },
  };

  const [newTaskForm, setNewTaskForm] = useState(form);

  const { sendRequest } = useHttp();

  const { value: statusId } = newTaskForm.statusId;

  useEffect(() => {
    if (!statusOptions.length) {
      const initStatusOptions = (options) => {
        const inProgressStatus = options.find((o) => o.value === "inProgress");

        if (!statusId) {
          setNewTaskForm((prevState) => {
            const updatedObject = { ...prevState };

            updatedObject.statusId.value = inProgressStatus._id;
            updatedObject.statusId.error = "";
            updatedObject.statusId.isValid = true;

            return updatedObject;
          });
        }

        const mappedOptions = options.map((o) => {
          const text = formatCamelCase(o.value);

          return {
            ...o,
            text,
          };
        });

        setStatusOptions(() => mappedOptions);
      };

      const requestConfig = {
        method: "get",
        url: `${url}/statuses`,
      };

      sendRequest(requestConfig, initStatusOptions);
    }
  }, [sendRequest, statusOptions, statusId]);

  const onInputChange = ({ target }) => {
    const { value, name } = target;

    setNewTaskForm((prevState) => {
      const trimmedValue = value.trim();
      const updatedObject = { ...prevState };

      updatedObject[name].value = value;

      updatedObject[name].error = "";
      updatedObject[name].isValid = Boolean(trimmedValue);

      return updatedObject;
    });
  };

  const onAddPost = useCallback(
    (event) => {
      event.preventDefault();

      const isValid = Object.keys(newTaskForm).every(
        (k) => newTaskForm[k].isValid
      );

      if (!isValid) {
        setNewTaskForm((prevState) => {
          const updatedObject = { ...prevState };

          for (const key in updatedObject) {
            updatedObject[key].error = `Please enter a valid ${key} value`;
            updatedObject[key].isValid = false;
          }

          return updatedObject;
        });

        return;
      }

      const newTask = {};

      for (const key in newTaskForm) {
        newTask[key] = newTaskForm[key].value.trim();
      }

      dispatch(globalActions.tasks.postTask(newTask));
      emitCloseModal();
    },
    [dispatch, newTaskForm, emitCloseModal]
  );

  const shouldDisable = !Object.keys(newTaskForm).every(
    (k) => newTaskForm[k].isValid
  );

  const titleErrorRenderer = newTaskForm.title.error &&
    !newTaskForm.title.isValid && (
      <span className={classes.error}>{newTaskForm.title.error}</span>
    );

  const descriptionErrorRenderer = newTaskForm.description.error &&
    !newTaskForm.description.isValid && (
      <span className={classes.error}>{newTaskForm.description.error}</span>
    );

  return (
    <form className={classes["new-task"]} onSubmit={onAddPost}>
      <h1 className={classes.title}>New task</h1>
      <div className={classes.body}>
        <div className={classes["field-wrapper"]}>
          <CustomInput
            label="Title :"
            type="text"
            value={newTaskForm.title.value}
            id="title"
            name="title"
            className={classes.field}
            emitChange={onInputChange}
          />
          {titleErrorRenderer}
        </div>
        <div className={classes["field-wrapper"]}>
          <CustomInput
            label="Description :"
            type="textarea"
            value={newTaskForm.description.value}
            id="description"
            name="description"
            className={classes.field}
            emitChange={onInputChange}
          />
          {descriptionErrorRenderer}
        </div>
        <div className={classes.field}>
          <label htmlFor="new_task_status">Status :</label>
          <CustomSelect
            className={classes["status-select"]}
            id="new_task_status"
            name="statusId"
            value={newTaskForm.statusId.value}
            options={statusOptions}
            optionValue="_id"
            optionText="text"
            emitSelect={onInputChange}
          />
        </div>
        <Button
          text="Confirm"
          className={classes.confirm}
          disable={shouldDisable}
        />
      </div>
    </form>
  );
};

export default NewTask;
