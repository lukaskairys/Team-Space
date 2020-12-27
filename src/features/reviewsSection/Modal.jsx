import React, { useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import Button from "../../components/button/Button";
import { ReactComponent as IconX } from "../../assets/images/x.svg";
import "./modal.scss";
import { useOnClickOutside } from "../../utils/useOnClickOutside";

const Modal = ({ children, closeModal, setModalOpen }) => {
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
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  closeModal: PropTypes.func,
  setModalOpen: PropTypes.func,
};
export default Modal;
