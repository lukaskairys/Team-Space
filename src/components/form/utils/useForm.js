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
  const { data } = useRequest("/users", repeatRequest);
  const { userId } = useAuthentication();

  const handleXclick = (inputRef) => {
    const inputName = inputRef.current.name;
    // clear current input value
    setValues({
      ...values,
      [inputName]: "",
    });
  };
  const currentUser = data.filter((user) => user.id === userId)[0];

  useEffect(() => {
    setPasswordCorrect(
      values.oldPassword &&
        bcrypt.compareSync(values.oldPassword, currentUser.password)
    );
  }, [currentUser, values.oldPassword]);

  const err = validate(values, data, passwordCorrect);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.oldPassword) {
      setPasswordCorrect(
        bcrypt.compareSync(values.oldPassword, currentUser.password)
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
  };

  const handleChange = (event) => {
    event.persist();
    const { name, value } = event.target;
    setRepeatRequest(false);
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
