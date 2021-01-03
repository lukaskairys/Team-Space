import React, { useContext, useState, useEffect } from "react";
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
import { isObjectEmpty } from "utils/objects";
import { todaysDate } from "utils/date";

import "./settings.scss";

function Settings() {
  const { data } = useContext(UserContext);
  const { modalOpen, showModal, setModalOpen, closeModal } = useModal();

  const [whichForm, setWhichForm] = useState("account");
  const [user, setUser] = useState({});

  const { deleteUser } = useProfileSettings(user, setUser);

  useEffect(() => {
    if (data && !isObjectEmpty(data)) {
      setUser(data);
    }
  }, [data, setUser]);

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
        <h1 className="profile-settings__title">Profile settings</h1>
        <div className="profile-settings__content">
          <CurrentInfo user={user} />
          <Form
            action={getAction()}
            max={todaysDate()}
            user={user}
            setUser={setUser}
            showModal={showModal}
            settingsHeaderRenderer={() => (
              <SettingsHeader
                setWhichForm={setWhichForm}
                whichForm={whichForm}
                userImage={user.userImage}
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
            withPassword={true}
            title={"Do you really want to delete your account?"}
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
