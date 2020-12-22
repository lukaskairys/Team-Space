import React from "react";
import PropTypes from "prop-types";

import Button from "components/button/Button";
import "./confirmationModalContent.scss";

const ConfirmationModalContent = ({ confirm, cancel, title, content }) => {
  return (
    <div className="confirmation">
      <h4 className="confirmation__question">{title}</h4>
      <p className="confirmation__text">{content}</p>

      <div className="confirmation__buttons">
        <Button medium handleClick={confirm}>
          confirm
        </Button>
        <Button medium blank handleClick={cancel}>
          cancel
        </Button>
      </div>
    </div>
  );
};

ConfirmationModalContent.propTypes = {
  confirm: PropTypes.func,
  cancel: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.string,
};

export default ConfirmationModalContent;
