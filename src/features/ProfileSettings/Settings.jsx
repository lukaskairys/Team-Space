import React, { useContext } from "react";
import PropTypes from "prop-types";

import Modal from "components/Modal/Modal";
import Button from "components/button/Button";
import Form from "components/form/components/Form";

import { UserContext } from "contexts/UserContext";
import { useModal } from "utils/useModal";
import { useProfileSettings } from "features/ProfileSettings/useProfileSettings";
import ConfirmationModalContent from "components/Confirmation/ConfirmationModalContent";

function Settings({ whichForm, switchSettingsForm }) {
  const { data: user } = useContext(UserContext);
  const { modalOpen, showModal, setModalOpen, closeModal } = useModal();
  const { deleteUser } = useProfileSettings(user);

  const confirm = () => {
    deleteUser();
    closeModal();
  };

  const cancel = () => {
    closeModal();
  };

  return (
    <div className="profile-settings">
      <div className="form-container">
        <div className="profile-settings__buttons">
          <div>
            <Button
              blankNoBorder={true}
              isMarked={whichForm === "account" && true}
              handleClick={switchSettingsForm}
            >
              Account Details
            </Button>
            <Button
              blankNoBorder={true}
              isMarked={whichForm === "passwords" && true}
              handleClick={switchSettingsForm}
            >
              Change password
            </Button>
          </div>
          <Button blankNoBorder={true}>Profile picture</Button>
        </div>
        {whichForm === "account" && (
          <Form
            action={"account"}
            title={"Profile settings"}
            user={user}
            showModal={showModal}
          />
        )}
        {whichForm === "passwords" && (
          <Form action={"passwords"} title={"Profile settings"} user={user} />
        )}
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
