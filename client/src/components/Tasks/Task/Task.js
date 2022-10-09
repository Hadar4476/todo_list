import React, { useCallback, useState } from "react";
import { formatDate } from "../../../utils/date";

import Comments from "../../Comments/Comments";
import Status from "../../Status/Status";
import Button from "../../UI/Button/Button";

import classes from "./Task.module.scss";

const Task = (props) => {
  const { id, title, description, statusId, createDate, updateDate } = props;

  const formattedCreateDate = formatDate(createDate);
  const formattedUpdateDate = formatDate(updateDate);

  const [shouldLoadComments, setShouldLoadComments] = useState(false);

  const onToggleCommentsLoader = useCallback(() => {
    setShouldLoadComments((prevState) => !prevState);
  }, []);

  const commentsRenderer = shouldLoadComments && <Comments taskId={id} />;

  const buttonText = shouldLoadComments ? "Hide comments" : "Show comments";

  return (
    <li className={classes.task}>
      <div className={classes.header}>
        <span className={classes.title}>{title}</span>
        <Status className={classes.status} statusId={statusId} />
      </div>
      <div className={classes.body}>
        <span className={classes.description}>{description}</span>
        <div className={classes.date}>
          <span className={classes.text}>Created at:</span>
          <span className={classes.time}>{formattedCreateDate}</span>
        </div>
        <div className={classes.date}>
          <span className={classes.text}>Updated at:</span>
          <span className={classes.time}>{formattedUpdateDate}</span>
        </div>
        {commentsRenderer}
      </div>
      <Button
        text={buttonText}
        className={classes["comments-toggler"]}
        emitClick={onToggleCommentsLoader}
      />
    </li>
  );
};

export default Task;
