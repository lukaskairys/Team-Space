import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useModal } from "utils/useModal";
import { getFormControlsData } from "../utils/formsSwitchers";
import Button from "components/button/Button";
import Modal from "components/Modal/Modal";
import ConfirmationModalContent from "components/Confirmation/ConfirmationModalContent";
import "./formControls.scss";

function FormControls({ action, confirmDeleteAccount }) {
  const deleteBtnRef = useRef(null);
  const { modalOpen, showModal, setModalOpen, closeModal } = useModal();

  const { label, textBeforeLink, linkText, linkPath } = getFormControlsData(
    action
  );

  const renderLink = () => {
    if (linkPath !== "") {
      return (
        <Link to={linkPath} className="form-controls__link">
          {linkText}
        </Link>
      );
    }
    return "";
  };

  return (
    <div className="form-controls">
      <Button type={"submit"} large={true}>
        <span>{label}</span>
      </Button>
      <p>
        {textBeforeLink}
        {action === "account" ? (
          <Button
            handleClick={showModal}
            blankNoBorder
            buttonRef={deleteBtnRef}
          >
            Delete my account
          </Button>
        ) : (
          renderLink()
        )}
      </p>

      {modalOpen && (
        <Modal
          closeModal={() => {
            closeModal(deleteBtnRef);
          }}
          setModalOpen={setModalOpen}
          modalTitle={"Confirmation."}
        >
          <ConfirmationModalContent
            withPassword={true}
            confirm={confirmDeleteAccount}
            cancel={() => {
              closeModal(deleteBtnRef);
            }}
            title={"Do you really want to delete your account?"}
            content={"All your saved data will be lost."}
          />
        </Modal>
      )}
    </div>
  );
}

FormControls.propTypes = {
  action: PropTypes.string,
  confirmDeleteAccount: PropTypes.func,
};

export default FormControls;
