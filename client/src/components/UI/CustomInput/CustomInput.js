import React from "react";

import classes from "./CustomInput.module.scss";

const CustomInput = (props) => {
  const { label, type, value, id, name, placeholder, className, emitChange } =
    props;

  const labelRenderer = label && <label htmlFor={id}>{label}</label>;
  const inputRenderer =
    type === "textarea" ? (
      <textarea
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={emitChange}
        cols="30"
        rows="10"
      ></textarea>
    ) : (
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={emitChange}
      />
    );

  return (
    <div className={`${classes["input-wrapper"]} ${className}`}>
      {labelRenderer}
      {inputRenderer}
    </div>
  );
};

export default React.memo(CustomInput);
