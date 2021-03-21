import React from "react";

const Modal = ({ title, message, onSave, onCancel }) => {
  return (
    <div
      className="modal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onCancel}
            ></button>
          </div>
          <div className="modal-body"> {message} </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={onSave}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
