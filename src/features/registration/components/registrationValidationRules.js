function validate(values) {
  const { firstName, lastName, email, password, repeatPassword } = values;
  let errors = {};
  // first name
  if (!firstName) {
    errors.firstName = "First Name is required";
  } else if (firstName.length < 3) {
    errors.firstName = "First Name should be at least 3 characters long.";
  }
  // last name
  if (!lastName) {
    errors.lastName = "Last Name is required";
  } else if (lastName.length < 3) {
    errors.lastName = "Last Name should be at least 3 characters long.";
  }
  // email
  if (!email) {
    errors.email = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email address is invalid";
  }
  // password
  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be 6 or more characters";
  }
  // password repeat
  if (!repeatPassword) {
    errors.repeatPassword = "Repeat Password is required";
  } else if (password.length < 6) {
    errors.repeatPassword = "Password must be 6 or more characters";
  } else if (password !== repeatPassword) {
    errors.repeatPassword = "Passwords must match";
    errors.password = "Passwords must match";
  }
  return errors;
}

export default validate;
