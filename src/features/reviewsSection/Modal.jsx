import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import Button from "../../components/button/Button";
import "./modal.scss";

const Modal = ({ children, closeModal }) => {
  // const [show, setShow] = useState(false);

  const content = (
    <div className="overlay">
      <div className="modal">
        <div className="modal__content">{children}</div>
        <Button type={"button"} medium={true} handleClick={closeModal}>
          <span>Close</span>
        </Button>
      </div>
    </div>
  );

  return <>{createPortal(content, document.body)}</>;
};

Modal.propTypes = {
  children: PropTypes.array,
  closeModal: PropTypes.func,
};
export default Modal;
