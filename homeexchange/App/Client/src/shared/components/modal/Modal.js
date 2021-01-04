import React from "react";
import "./modal.scss";
function Modal(props) {
  const { onClose } = props;
  return (
    <div className="modal">
      <div className="modal__body">
        <div className="modal__close">
          <button
            className="modal__close-btn"
            onClick={(e) => {
              onClose(e);
            }}
          >
            <div>+</div>
          </button>
        </div>
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
