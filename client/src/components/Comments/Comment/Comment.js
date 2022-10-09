import React from "react";
import { formatDate } from "../../../utils/date";

import classes from "./Comment.module.scss";

const Comment = (props) => {
  const { content, createDate } = props;

  const formattedDate = formatDate(createDate);

  return (
    <li className={classes.comment}>
      <span className={classes.content}>{content}</span>
      <span className={classes.date}>{formattedDate}</span>
    </li>
  );
};

export default Comment;
