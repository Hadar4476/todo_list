import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = (props) => {
  const { icon, className, emitClick } = props;

  return (
    <div className={className}>
      <FontAwesomeIcon icon={icon} onClick={emitClick} />
    </div>
  );
};

export default Icon;
