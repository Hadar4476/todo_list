import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.scss";

const ModalPortal = (props) => {
  const { displayState, children } = props;

  return (
    <div className={`${classes.modal} ${classes[`modal-${displayState}`]}`}>
      {children}
    </div>
  );
};

const Modal = (props) => {
  const { displayState, children } = props;

  const modalPortalElement = document.getElementById("modal_portal");

  const modalPortal = ReactDOM.createPortal(
    <ModalPortal displayState={displayState} children={children} />,
    modalPortalElement
  );

  return <Fragment>{modalPortal}</Fragment>;
};

export default Modal;
