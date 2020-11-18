import { useState } from "react";
import { isObjectEmpty } from "../../utils/objects";

const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleXclick = (inputRef) => {
    const inputName = inputRef.current.name;
    // clear current input value
    setValues({
      ...values,
      [inputName]: "",
    });
  };
  const err = validate(values);
  const validateForm = () => {
    setErrors(err);
    if (isObjectEmpty(err)) {
      callback();
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    validateForm();
    if (isObjectEmpty(err)) {
      setValues({});
    }
  };

  const handleChange = (event) => {
    event.persist();
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFocus = (event) => {
    const { name } = event.target;
    event.persist();
    // delete error from state
    const { [name]: tmp, ...rest } = errors;
    setErrors(rest);
  };

  return {
    handleChange,
    handleSubmit,
    handleFocus,
    values,
    errors,
    isValid,
    handleXclick,
  };
};

export default useForm;
