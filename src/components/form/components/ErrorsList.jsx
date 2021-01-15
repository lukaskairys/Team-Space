import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import "./errorsList.scss";

const ErrorsList = ({ errors, submitClicked }) => {
  const errorsArray = Object.entries(errors);
  const linkRef = useRef([]);

  useEffect(() => {
    submitClicked && linkRef?.current && linkRef.current[0].focus();
  }, [submitClicked]);

  return (
    <div className="errors-list">
      <h3 className="errors-list__title" id="errors-list-title">
        {errorsArray.length} error{errorsArray.length > 1 && "s"} occured:
      </h3>
      <ul aria-labelledby="errors-list-title">
        {errorsArray.map((err, i) => (
          <li key={i} className="errors-list__item">
            <a
              href={`#${err[0]}`}
              className="errors-list__link"
              aria-labelledby={`err-text-${err[0]}`}
              ref={(el) => (linkRef.current[i] = el)}
            >
              {err[0]
                .replace(/([A-Z])/g, (match) => ` ${match}`)
                .replace(/^./, (match) => match.toUpperCase())}
            </a>
            :{" "}
            <span className="errors-list__text" id={`err-text-${err[0]}`}>
              {err[1]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

ErrorsList.propTypes = {
  errors: PropTypes.object,
  submitClicked: PropTypes.bool,
};
export default ErrorsList;
