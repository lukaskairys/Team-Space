import React, { useState } from "react";

import Settings from "features/ProfileSettings/Settings";

import "./profileSettings.scss";

function ProfileSettings() {
  const [whichForm, setWhichForm] = useState("account");

  const switchSettingsForm = (event) => {
    if (!event.target.classList.contains("is-active-setting")) {
      if (whichForm !== "passwords") {
        setWhichForm("passwords");
      }
      if (whichForm !== "account") setWhichForm("account");
    }
  };

  return (
    <Settings whichForm={whichForm} switchSettingsForm={switchSettingsForm} />
  );
}

export default ProfileSettings;
