import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import bcrypt from "bcryptjs";

import Modal from "components/Modal/Modal";
import Button from "components/button/Button";
import Form from "components/form/components/Form";

import { UserContext } from "contexts/UserContext";
import { useModal } from "utils/useModal";
import { useProfileSettings } from "features/ProfileSettings/useProfileSettings";
import ConfirmationModalContent from "components/Confirmation/ConfirmationModalContent";

import "./settings.scss";

function Settings() {
  const { data: user } = useContext(UserContext);
  const { modalOpen, showModal, setModalOpen, closeModal } = useModal();
  const { deleteUser } = useProfileSettings(user);

  const [whichForm, setWhichForm] = useState("account");

  const confirm = (inputValue, setError) => {
    bcrypt.compare(inputValue, user.password).then((result) => {
      if (result) {
        deleteUser();
        closeModal();
      } else {
        setError("Wrong password. Please try again.");
      }
    });
  };

  const cancel = () => {
    closeModal();
  };

  return (
    <div className="profile-settings">
      <h2 className="profile-settings__title">Profile settings</h2>
      <div className="form-container">
        <div className="profile-settings__nav">
          <div className="profile-settings__nav-left">
            <Button
              blankNoBorder={true}
              isMarked={whichForm === "account" && true}
              handleClick={() => setWhichForm("account")}
            >
              Account Details
            </Button>
            <Button
              blankNoBorder={true}
              isMarked={whichForm === "passwords" && true}
              handleClick={() => setWhichForm("passwords")}
            >
              Change password
            </Button>
            <Button
              blankNoBorder={true}
              isMarked={whichForm === "email" && true}
              handleClick={() => setWhichForm("email")}
            >
              Change email
            </Button>
          </div>
          <div className="profile-settings__nav-right">
            <Button blankNoBorder={true}>
              <img
                className="profile-widget__picture"
                src={user.userImage}
                alt="user profile"
              />
              <span className="profile-widget__photo-text">Upload a photo</span>
            </Button>
          </div>
        </div>
        {whichForm === "account" && (
          <Form action={"account"} user={user} showModal={showModal} />
        )}
        {whichForm === "passwords" && <Form action={"passwords"} user={user} />}
        {whichForm === "email" && <Form action={"email"} user={user} />}
      </div>

      {modalOpen && (
        <Modal closeModal={closeModal} setModalOpen={setModalOpen}>
          <ConfirmationModalContent
            confirm={confirm}
            cancel={cancel}
            title={"Do your really want to delete your account?"}
            content={"All your saved data will be lost."}
          />
        </Modal>
      )}
    </div>
  );
}

Settings.propTypes = {
  whichForm: PropTypes.string,
  switchSettingsForm: PropTypes.func,
};

export default Settings;
