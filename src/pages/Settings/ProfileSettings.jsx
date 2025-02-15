import React from "react";
import { Helmet } from "react-helmet-async";

import Settings from "features/ProfileSettings/Settings";

function ProfileSettings() {
  return (
    <>
      <Helmet>
        <title>Profile settings · Team Space</title>
      </Helmet>
      <Settings />
    </>
  );
}

export default ProfileSettings;
