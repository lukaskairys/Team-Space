import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import bcrypt from "bcryptjs";

import SettingsNavigation from "./SettingsNavigation";
import Form from "components/form/components/Form";
import CurrentInfo from "./CurrentInfo";

import { UserContext } from "contexts/UserContext";
import { useProfileSettings } from "features/ProfileSettings/useProfileSettings";
import { isObjectEmpty } from "utils/objects";
import { todaysDate } from "utils/date";

import "./settings.scss";

function Settings() {
  const { data } = useContext(UserContext);

  const [whichForm, setWhichForm] = useState("change-details");
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
      } else {
        setError("Wrong password. Please try again.");
      }
    });
  };

  const getAction = () => {
    let action;
    switch (whichForm) {
      case "change-details":
        action = "account";
        break;
      case "change-password":
        action = "password";
        break;
      case "change-email":
        action = "email";
        break;
      default:
        return;
    }
    return action;
  };

  return (
    <div className="profile-settings">
      <h1 id="main-content settings-title" className="profile-settings__title">
        Profile settings
      </h1>
      <div className="profile-settings__content">
        <CurrentInfo user={user} />
        <Form
          action={getAction()}
          maxDate={todaysDate()}
          user={user}
          setUser={setUser}
          confirmDeleteAccount={confirm}
          settingsNavigationRenderer={(setValues, setErrors) => (
            <SettingsNavigation
              setValues={setValues}
              setErrors={setErrors}
              setWhichForm={setWhichForm}
              whichForm={whichForm}
            />
          )}
        />
      </div>
    </div>
  );
}

Settings.propTypes = {
  whichForm: PropTypes.string,
  switchSettingsForm: PropTypes.func,
};

export default Settings;
