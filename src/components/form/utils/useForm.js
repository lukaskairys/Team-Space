import bcrypt from "bcryptjs";
import { useState, useEffect } from "react";

import { useRequest } from "apis/useRequest";
import { isObjectEmpty } from "utils/objects";
import { useAuthentication } from "authentication/useAuthentication";

const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [repeatRequest, setRepeatRequest] = useState(false);
  const [passwordCorrect, setPasswordCorrect] = useState(true);
  const [submitClicked, setSubmitClicked] = useState(false);
  const { data } = useRequest("/users", repeatRequest);
  const { userId } = useAuthentication();

  const currentUser = data.filter((user) => user.id === userId)[0];

  useEffect(() => {
    setPasswordCorrect(
      values.currentPassword &&
        bcrypt.compareSync(values.currentPassword, currentUser.password)
    );
  }, [currentUser, values.currentPassword]);

  const err = validate(values, data, passwordCorrect);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.currentPassword) {
      setPasswordCorrect(
        bcrypt.compareSync(values.currentPassword, currentUser.password)
      );
    }
    setRepeatRequest(true);
    setErrors(err);
    if (isObjectEmpty(err)) {
      callback();
      setIsValid(true);
      setValues({});
    } else {
      setIsValid(false);
    }
    setSubmitClicked(true);
    window.location.hash = "";
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
    handleBlur,
    setErrors,
    setValues,
    values,
    errors,
    isValid,
    submitClicked,
  };
};

export default useForm;
