import React, { useState } from "react";

import Button from "components/button/Button";
import UserContextProvider from "contexts/UserContextProvider";
import Form from "components/form/components/Form";
import { ReactComponent as Logo } from "assets/logo165.svg";

import "components/form/formPage.scss";
import "./profileSettings.scss";

function ProfileSettings() {
  const [whichForm, setWhichForm] = useState("account");

  const makeActive = (event) => {
    if (!event.target.classList.contains("is-active-setting")) {
      if (whichForm !== "passwords") {
        setWhichForm("passwords");
      }
      if (whichForm !== "account") setWhichForm("account");
    }
  };
  return (
    <UserContextProvider>
      <div className="page-container">
        <div className="form-container profile-settings">
          <Logo className="logo" />
          <h2 className="profile-settings__title">Profile settings</h2>
          <div className="profile-settings__buttons">
            <div>
              <Button
                blankNoBorder={true}
                isMarked={whichForm === "account" && true}
                handleClick={makeActive}
              >
                Account
              </Button>
              <Button
                blankNoBorder={true}
                isMarked={whichForm === "passwords" && true}
                handleClick={makeActive}
              >
                Change password
              </Button>
            </div>
            <Button blankNoBorder={true}>Delete account</Button>
          </div>
          {whichForm === "account" && <Form action={"account"} />}
          {whichForm === "passwords" && <Form action={"passwords"} />}
        </div>
      </div>
    </UserContextProvider>
  );
}

export default ProfileSettings;
