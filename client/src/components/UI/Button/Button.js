import React from "react";

import classes from "./Button.module.scss";

const Button = (props) => {
  const { text, className, disable, emitClick } = props;

  return (
    <button
      className={`${classes.button} ${className}`}
      disabled={disable}
      onClick={emitClick}
    >
      {text}
    </button>
  );
};

export default React.memo(Button);
