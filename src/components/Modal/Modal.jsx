import React, { useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes, { oneOfType } from "prop-types";

import Button from "components/button/Button";
import { ReactComponent as IconX } from "assets/images/x.svg";
import { useOnClickOutside } from "utils/useOnClickOutside";

import "./modal.scss";

const Modal = (props) => {
  const { children, setModalOpen, closeModal } = props;
  const modalRef = useRef(null);

  useOnClickOutside(modalRef, () => setModalOpen(false));

  const content = (
    <div className="overlay">
      <div className="modal" ref={modalRef}>
        <div className="modal__button-container">
          <Button type={"button"} iconX={true} handleClick={closeModal}>
            <IconX />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
  return createPortal(content, document.querySelector("#modal-root"));
};

Modal.propTypes = {
  children: oneOfType([PropTypes.element, PropTypes.array]),
  closeModal: PropTypes.func,
  setModalOpen: PropTypes.func,
};
export default Modal;
