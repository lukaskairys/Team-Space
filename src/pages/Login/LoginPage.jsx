import React from "react";
import { Helmet } from "react-helmet-async";

import Form from "components/form/components/Form";
import { ReactComponent as Logo } from "assets/logo165.svg";

import "components/form/formPage.scss";

function LoginPage() {
  return (
    <div className="page-container">
      <Helmet>
        <title>Login · Team Space</title>
      </Helmet>
      <main className="form-container">
        <Logo className="logo" />
        <Form
          action={"login"}
          title={"Login"}
          subtitle={"Welcome back, please login."}
          buttonLabel={"Login"}
        />
      </main>
    </div>
  );
}

export default LoginPage;
