import React from "react";

import MainLayout from "components/MainLayout/MainLayout";
import Settings from "features/ProfileSettings/Settings";
import UserContextProvider from "contexts/UserContextProvider";

function ProfileSettings() {
  return (
    <UserContextProvider>
      <MainLayout>
        <Settings />
      </MainLayout>
    </UserContextProvider>
  );
}

export default ProfileSettings;
