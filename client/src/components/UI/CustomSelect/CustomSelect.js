import React from "react";

import classes from "./CustomSelect.module.scss";

const CustomSelect = (props) => {
  const {
    id,
    name,
    value,
    options,
    optionValue,
    optionText,
    className,
    emitSelect,
  } = props;

  const optionElements = options.map((o) => {
    return (
      <option key={o[optionValue]} value={o[optionValue]}>
        {o[optionText]}
      </option>
    );
  });

  return (
    <div className={`${classes["custom-select"]} ${className}`}>
      <select id={id} name={name} value={value} onChange={emitSelect}>
        {optionElements}
      </select>
    </div>
  );
};

export default React.memo(CustomSelect);
