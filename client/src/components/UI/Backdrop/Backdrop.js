import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./Backdrop.module.scss";

const BackdropPortal = (props) => {
  const { displayState, emitClick } = props;

  return (
    <div
      className={`${classes.backdrop} ${classes[`backdrop-${displayState}`]}`}
      onClick={emitClick}
    ></div>
  );
};

const Backdrop = (props) => {
  const { displayState, emitClick } = props;

  const backdropPortalElement = document.getElementById("backdrop_portal");

  const backdropPortal = ReactDOM.createPortal(
    <BackdropPortal displayState={displayState} emitClick={emitClick} />,
    backdropPortalElement
  );

  return <Fragment>{backdropPortal}</Fragment>;
};

export default Backdrop;
