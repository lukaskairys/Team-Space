import React, { useState } from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Button from "components/button/Button";
import UserContextProvider from "contexts/UserContextProvider";
import Form from "components/form/components/Form";

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
      <MainLayout>
        <div className="profile-settings">
          <div className="form-container">
            <div className="profile-settings__buttons">
              <div>
                <Button
                  blankNoBorder={true}
                  isMarked={whichForm === "account" && true}
                  handleClick={makeActive}
                >
                  Account Details
                </Button>
                <Button
                  blankNoBorder={true}
                  isMarked={whichForm === "passwords" && true}
                  handleClick={makeActive}
                >
                  Change password
                </Button>
              </div>
              <Button blankNoBorder={true}>Profile picture</Button>
            </div>
            {whichForm === "account" && (
              <Form action={"account"} title={"Profile settings"} />
            )}
            {whichForm === "passwords" && (
              <Form action={"passwords"} title={"Profile settings"} />
            )}
          </div>
        </div>
      </MainLayout>
    </UserContextProvider>
  );
}

export default ProfileSettings;
