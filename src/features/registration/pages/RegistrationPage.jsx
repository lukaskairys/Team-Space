import React from "react";
import Form from "../../../components/form/Form";
import { ReactComponent as Logo } from "../../../assets/logo165.svg";
import "../../../components/form/formPage.scss";

function RegistrationPage() {
  return (
    <div className="page-container">
      <div className="form-container">
        <Logo className="logo" />
        <Form
          isRegister={true}
          heading={"Registration"}
          underHeading={"Let’s get you on board."}
          buttonLabel={"Register"}
        />
      </div>
    </div>
  );
}

export default RegistrationPage;
