import bcrypt from "bcryptjs";
import { useState, useEffect } from "react";

import { useRequest } from "apis/useRequest";
import { isObjectEmpty } from "utils/objects";
import { useAuthentication } from "authentication/useAuthentication";

const useForm = (callback, validate, setShowMessage) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [repeatRequest, setRepeatRequest] = useState(false);
  const [passwordCorrect, setPasswordCorrect] = useState(true);
  const [submitClicked, setSubmitClicked] = useState(false);
  const { data } = useRequest("/users", repeatRequest);
  const { userId } = useAuthentication();

  const currentUser = data.filter((user) => user.id === userId)[0];

  useEffect(() => {
    try {
      setPasswordCorrect(
        values.currentPassword &&
          bcrypt.compareSync(values.currentPassword, currentUser.password)
      );
    } catch (err) {
      return;
    }
  }, [currentUser, values.currentPassword]);

  const errorsFromValidation = validate(values, data, passwordCorrect);

  const submit = () => {
    setErrors(errorsFromValidation);
    if (isObjectEmpty(errorsFromValidation)) {
      callback();
      setValues({});
    }
    setSubmitClicked(true);
  };

  const handleSettingsSubmit = (event) => {
    event.preventDefault();
    if (currentUser && values.currentPassword) {
      setPasswordCorrect(
        bcrypt.compareSync(values.currentPassword, currentUser.password)
      );
    }
    currentUser && !isObjectEmpty(currentUser)
      ? submit()
      : setShowMessage(true);

    setRepeatRequest(true);
    window.location.hash = "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    data.length !== 0 ? submit() : setShowMessage(true);
  };

  const handleChange = (event) => {
    event.persist();
    const { name, value } = event.target;
    setRepeatRequest(false);
    setValues({
      ...values,
      [name]: value,
    });
    setSubmitClicked(false);
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    event.persist();
    //delete error from state
    const { [name]: tmp, ...rest } = errors;
    setErrors(rest);
    setSubmitClicked(false);
  };

  return {
    handleChange,
    handleSubmit,
    handleSettingsSubmit,
    handleBlur,
    setErrors,
    setValues,
    values,
    errors,
    submitClicked,
    setRepeatRequest,
  };
};

export default useForm;
