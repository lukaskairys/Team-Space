export function validateRegistration(values, data) {
  const { firstName, email, password, repeatPassword } = values;
  let errors = {};
  // first name
  if (!firstName) {
    errors.firstName = "First Name is required";
  } else if (firstName.length < 3) {
    errors.firstName = "First Name should be at least 3 characters long.";
  }
  // email
  if (!email) {
    errors.email = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email address is invalid";
  } else if (data && data.some((user) => user.email === email)) {
    errors.email = "This email address is already taken.";
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

export function validateLogin(values) {
  const { email, password } = values;
  let errors = {};
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
  return errors;
}

export function noValidation() {
  return {};
}

export function validatePasswords(values, data, passwordCorrect) {
  const { currentPassword, repeatPassword } = values;
  let { newPassword } = values;

  let errors = {};
  //current password
  if (!currentPassword) {
    errors.currentPassword = "Current password is required";
  } else if (currentPassword.length < 6) {
    errors.currentPassword = "Password must be 6 or more characters";
  } else if (!passwordCorrect) {
    errors.currentPassword = "Password is incorrect";
  }
  // new password
  if (!newPassword) {
    errors.newPassword = "Password is required";
  } else if (newPassword.length < 6) {
    errors.newPassword = "Password must be 6 or more characters";
  } else if (newPassword === currentPassword) {
    errors.newPassword =
      "New password should be different from the current one.";
    errors.repeatPassword =
      "New password should be different from the current one.";
  }
  // password repeat
  if (!repeatPassword) {
    errors.repeatPassword = "Repeat Password is required";
  } else if (!newPassword) {
    newPassword = " ";
  } else if (newPassword.length < 6) {
    errors.repeatPassword = "Password must be 6 or more characters";
  } else if (newPassword !== repeatPassword) {
    errors.repeatPassword = "Passwords must match";
    errors.newPassword = "Passwords must match";
  }

  return errors;
}

export function validateEmail(values, data, passwordCorrect) {
  const { email, currentPassword } = values;
  let errors = {};
  // email
  if (!email) {
    errors.email = "Email address is required";
  } else if (email && !/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email address is invalid";
  } else if (email && data && data.some((user) => user.email === email)) {
    errors.email = "This email address is already taken.";
  }

  // password
  if (!currentPassword) {
    errors.currentPassword = "Current password is required";
  } else if (currentPassword.length < 6) {
    errors.currentPassword = "Password must be 6 or more characters";
  } else if (!passwordCorrect) {
    errors.currentPassword = "Password is incorrect";
  }
  return errors;
}
