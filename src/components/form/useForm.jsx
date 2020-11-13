import { useState, useEffect } from "react";

const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors, callback, isSubmitting]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    document.querySelector(".form__input").value = "";
    setErrors(validate(values));
    setIsSubmitting(true);
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
  };
};

export default useForm;
