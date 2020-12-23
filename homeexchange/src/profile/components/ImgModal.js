import React from "react";
import "./img-modal.scss";
function ImgModal(props) {
  const { onClose } = props;
  return (
    <div className="img-modal">
      <div className="img-modal__body">
        <div className="img-modal__close">
          <button
            className="img-modal__close-btn"
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

export default ImgModal;
