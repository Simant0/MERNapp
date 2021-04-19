import React from "react";
import "./Modal.css";
import PropTypes from "prop-types";

const Modal = ({ show, children }) => {
  if (show) {
    return (
      // <div className={show ? "modal show" : "modal hide"}>
      <div className="modal">
        <div className="modal__children">{children}</div>
        <div className="modal__buttons">
          {/* <button
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </button> */}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

Modal.propTypes = {
  //   handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Modal;
