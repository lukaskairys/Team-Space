import React from "react";
import PropTypes from "prop-types";

import { getFormStructure } from "../utils/formsSwitchers";
import FormInput from "../input/FormInput";

import "./formContent.scss";

function FormContent(props) {
  const { action, values, errors, handleChange, handleBlur, maxDate } = props;

  const formStructure = getFormStructure(action);

  return (
    <div className="form-content">
      {formStructure.map((field, i) => (
        <div
          className={`form-content__item ${
            field.inputLong && "form-content__item--long"
          }`}
          key={i}
        >
          <FormInput
            label={field.text}
            type={field.type}
            value={values[field.name] || ""}
            name={field.name}
            placeholder={field.placeholder}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-input ${
              errors[field.name] && "form-input--error"
            }`}
            isError={errors[field.name] ? true : false}
            maxDate={maxDate}
            describedby={`error-${field.text}`}
            ariaRequired={field.required}
            errors={errors}
          />
          <p
            className="form-content__error-msg"
            id={`error-${field.text}`}
            aria-live="assertive"
          >
            {errors[field.name]}
          </p>
        </div>
      ))}
    </div>
  );
}

FormContent.propTypes = {
  action: PropTypes.string,
  values: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  maxDate: PropTypes.string,
};

export default FormContent;
