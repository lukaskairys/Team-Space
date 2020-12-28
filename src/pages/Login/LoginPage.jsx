import React from "react";

import Form from "components/form/components/Form";
import { ReactComponent as Logo } from "assets/logo165.svg";

import "components/form/formPage.scss";

function LoginPage() {
  return (
    <div className="page-container">
      <div className="form-container">
        <Logo className="logo" />
        <Form
          action={"login"}
          title={"Login"}
          subtitle={"Welcome back, please login."}
          buttonLabel={"Login"}
        />
      </div>
    </div>
  );
}

export default LoginPage;
