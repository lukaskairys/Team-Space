import React, { useContext, useState, useEffect } from "react";
import bcrypt from "bcryptjs";
import { useLocation } from "react-router-dom";

import SettingsNavigation from "./SettingsNavigation";
import Form from "components/form/components/Form";
import CurrentInfo from "./CurrentInfo";

import { getAction } from "components/form/utils/formsSwitchers.js";
import { UserContext } from "contexts/UserContext";
import { useProfileSettings } from "features/ProfileSettings/useProfileSettings";
import { isObjectEmpty } from "utils/objects";
import { todaysDate } from "utils/date";

import "./settings.scss";

function Settings() {
  const [whichForm, setWhichForm] = useState("change-details");
  const [user, setUser] = useState({});

  const { data } = useContext(UserContext);
  const { deleteUser } = useProfileSettings(user, setUser);
  const location = useLocation();

  useEffect(() => {
    if (
      location.hash &&
      (location.hash === "#change-details" ||
        location.hash === "#change-password" ||
        location.hash === "#change-email")
    ) {
      setWhichForm(location.hash.substring(1));
    }
  }, [location.hash]);

  useEffect(() => {
    if (data && !isObjectEmpty(data)) {
      setUser(data);
    }
  }, [data, setUser]);

  const confirmDeleteAccount = (inputValue, setError) => {
    if (inputValue) {
      bcrypt.compare(inputValue, user.password).then((result) => {
        if (result) {
          deleteUser();
        } else {
          setError("Wrong password. Please try again.");
        }
      });
    } else {
      setError("Confirmation with password is required.");
    }
  };

  return (
    <div className="profile-settings">
      <h1 id="main-content settings-title" className="profile-settings__title">
        Profile settings
      </h1>
      <div className="profile-settings__content">
        <CurrentInfo user={user} />
        <Form
          action={getAction(whichForm)}
          maxDate={todaysDate()}
          user={user}
          setUser={setUser}
          confirmDeleteAccount={confirmDeleteAccount}
          isFromSettings
          settingsNavigationRenderer={() => (
            <SettingsNavigation
              setWhichForm={setWhichForm}
              whichForm={whichForm}
            />
          )}
        />
      </div>
    </div>
  );
}

export default Settings;
