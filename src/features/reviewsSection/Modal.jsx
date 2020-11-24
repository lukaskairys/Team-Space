import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import Button from "../../components/button/Button";
import { ReactComponent as IconX } from "../../assets/images/x.svg";
import "./modal.scss";

const Modal = ({ children, closeModal }) => {
  const content = (
    <div className="overlay">
      <div className="modal">
        {children}
        <Button type={"button"} del={true} handleClick={closeModal}>
          <IconX />
        </Button>
      </div>
    </div>
  );

  return createPortal(content, document.querySelector("#modal-root"));
};

Modal.propTypes = {
  children: PropTypes.array,
  closeModal: PropTypes.func,
};
export default Modal;
