import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import bcrypt from "bcryptjs";

import SettingsHeader from "./SettingsHeader";
import Form from "components/form/components/Form";
import CurrentInfo from "./CurrentInfo";
import Modal from "components/Modal/Modal";
import ConfirmationModalContent from "components/Confirmation/ConfirmationModalContent";

import { UserContext } from "contexts/UserContext";
import { useModal } from "utils/useModal";
import { useProfileSettings } from "features/ProfileSettings/useProfileSettings";

import "./settings.scss";

function Settings() {
  const { data: user } = useContext(UserContext);
  const { modalOpen, showModal, setModalOpen, closeModal } = useModal();
  const { deleteUser } = useProfileSettings(user);

  const [whichForm, setWhichForm] = useState("account");

  const todaysDate = () => {
    return new Date().toISOString().split("T")[0];
  };

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

  const getAction = () => {
    let action;
    switch (whichForm) {
      case "account":
        action = "account";
        break;
      case "passwords":
        action = "passwords";
        break;
      case "email":
        action = "email";
        break;
      default:
        return;
    }
    return action;
  };

  return (
    <>
      <article className="profile-settings">
        <h2 className="profile-settings__title">Profile settings</h2>
        <div className="profile-settings__content">
          <CurrentInfo user={user} />
          <Form
            action={getAction()}
            max={todaysDate()}
            user={user}
            showModal={showModal}
            settingsHeaderRenderer={() => (
              <SettingsHeader
                setWhichForm={setWhichForm}
                whichForm={whichForm}
                userImage={user.userImage}
                user={user}
              />
            )}
          />
        </div>
      </article>

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
    </>
  );
}

Settings.propTypes = {
  whichForm: PropTypes.string,
  switchSettingsForm: PropTypes.func,
};

export default Settings;
