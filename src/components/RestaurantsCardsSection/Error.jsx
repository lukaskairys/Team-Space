import React from "react";
import PropTypes from "prop-types";

import "./error.scss";

export default function Error({ message }) {
  return (
    <div className="restaurant-section-error">
      <span className="restaurant-section-error__message">
        {message}{" "}
        <span role="img" aria-label="sad face">
          &#128533;
        </span>
      </span>
    </div>
  );
}

Error.propTypes = {
  message: PropTypes.string,
};
