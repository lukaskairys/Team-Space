import React from "react";
import { Helmet } from "react-helmet-async";

import Form from "components/form/components/Form";
import { ReactComponent as Logo } from "assets/logo165.svg";

import "components/form/formPage.scss";

function RegistrationPage() {
  return (
    <div className="page-container">
      <Helmet>
        <title>Registration · Team Space</title>
      </Helmet>
      <main className="form-container">
        <Logo className="logo" />
        <Form
          action={"register"}
          title={"Register"}
          subtitle={"Let’s get you on board."}
          buttonLabel={"Register"}
        />
      </main>
    </div>
  );
}

export default RegistrationPage;
