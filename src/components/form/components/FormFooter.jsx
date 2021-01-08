import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useModal } from "utils/useModal";

import Button from "components/button/Button";
import Modal from "components/Modal/Modal";
import ConfirmationModalContent from "components/Confirmation/ConfirmationModalContent";
import "./formFooter.scss";

function FormFooter({ action, confirmDeleteAccount }) {
  const deleteBtnRef = useRef(null);
  const { modalOpen, showModal, setModalOpen, closeModal } = useModal();

  const getFormFooterData = () => {
    let data = {
      label: "",
      textBeforeLink: "",
      linkText: "",
      linkPath: "",
    };
    switch (action) {
      case "register":
        data.label = "Register";
        data.textBeforeLink = "Already have account?";
        data.linkText = "Sign in";
        data.linkPath = "/login";
        break;
      case "login":
        data.label = "Login";
        data.textBeforeLink = "Don't have an account?";
        data.linkText = "Sign up";
        data.linkPath = "/registration";
        break;
      case "account":
      case "passwords":
      case "email":
        data.label = "Change";
        break;
      default:
        return data;
    }
    return data;
  };

  const { label, textBeforeLink, linkText, linkPath } = getFormFooterData();

  return (
    <div className="form-footer">
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
          <Link to={linkPath} className="form-footer__link">
            {linkText}
          </Link>
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

FormFooter.propTypes = {
  action: PropTypes.string,
  confirmDeleteAccount: PropTypes.func,
};

export default FormFooter;
