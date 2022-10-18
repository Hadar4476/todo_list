import React, { useCallback, useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import { url } from "../../my-axios";

import Button from "../UI/Button/Button";
import Comment from "./Comment/Comment";
import CustomInput from "../UI/CustomInput/CustomInput";

import classes from "./Comments.module.scss";

const Comments = (props) => {
  const { taskId } = props;

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const { sendRequest } = useHttp();

  useEffect(() => {
    const initComments = (comments) => {
      setComments(comments);
    };

    const requestConfig = {
      method: "get",
      url: `${url}/comments/getCommentsByTaskId`,
      params: {
        taskId,
      },
    };

    sendRequest(requestConfig, initComments);
  }, [sendRequest, taskId]);

  const onChangeComment = useCallback(({ target }) => {
    const { value } = target;

    setComment(value);
  }, []);

  const onPostComment = useCallback(() => {
    const trimmedComment = comment.trim();

    if (trimmedComment) {
      const updateComments = (comment) => {
        setComments((prevState) => {
          return [comment, ...prevState];
        });

        setComment(() => "");
      };

      const newComment = {
        taskId,
        content: trimmedComment,
      };

      const requestConfig = {
        method: "post",
        url: `${url}/comments`,
        headers: {
          "Content-Type": "application/json",
        },
        body: newComment,
      };

      sendRequest(requestConfig, updateComments);
    }
  }, [sendRequest, comment, taskId]);

  const commentElements = comments.length ? (
    comments.map((c) => {
      return (
        <Comment key={c._id} content={c.content} createDate={c.createdAt} />
      );
    })
  ) : (
    <span>No comments found</span>
  );

  const shouldDisable = !Boolean(comment.trim());

  return (
    <div className={classes.comments}>
      <span className={classes.title}>Comments</span>
      <ul className={classes.list}>{commentElements}</ul>
      <div className={classes["post-comment"]}>
        <CustomInput
          type="textarea"
          id="comment"
          name="comment"
          placeholder="Type your comment here..."
          value={comment}
          className={classes["comment-input"]}
          emitChange={onChangeComment}
        />
        <Button
          text="Post"
          className={classes.post}
          disable={shouldDisable}
          emitClick={onPostComment}
        />
      </div>
    </div>
  );
};

export default Comments;
