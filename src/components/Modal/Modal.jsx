import React, { useRef, useEffect } from "react";
import FocusLock from "react-focus-lock";

import { createPortal } from "react-dom";
import PropTypes, { oneOfType } from "prop-types";

import Button from "components/button/Button";
import { ReactComponent as IconX } from "assets/images/x.svg";
import { useOnClickOutside } from "utils/useOnClickOutside";

import "./modal.scss";

const Modal = (props) => {
  const { children, setModalOpen, closeModal, modalTitle } = props;
  const modalRef = useRef(null);

  useOnClickOutside(modalRef, () => setModalOpen(false));

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", onKeyDown, false);
    return () => {
      document.removeEventListener("keydown", onKeyDown, false);
    };
  }, [closeModal]);

  const content = (
    <>
      <div className="overlay"></div>
      <FocusLock>
        <div
          className="modal"
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          tabIndex="-1"
        >
          <span id="modal-title" className="visually-hidden">
            {modalTitle}
          </span>
          <div className="modal__button-container">
            <Button
              type={"button"}
              iconX={true}
              handleClick={closeModal}
              aria-labelledby="button-title"
            >
              <span id="button-title" className="visually-hidden">
                Close
              </span>
              <IconX />
            </Button>
          </div>
          {children}
        </div>
      </FocusLock>
    </>
  );
  return createPortal(content, document.querySelector("#modal-root"));
};

Modal.propTypes = {
  children: oneOfType([PropTypes.element, PropTypes.array]),
  closeModal: PropTypes.func,
  setModalOpen: PropTypes.func,
  modalTitle: PropTypes.string,
};
export default Modal;
