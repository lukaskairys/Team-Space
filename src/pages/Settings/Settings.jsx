import React from "react";

import UserContextProvider from "contexts/UserContextProvider";

import Upload from "./Upload";

const Settings = () => {
  return (
    <>
      <UserContextProvider>
        <Upload />
      </UserContextProvider>
    </>
  );
};

export default Settings;
