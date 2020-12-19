const fields = {
  firstName: {
    type: "text",
    name: "firstName",
    text: "First Name",
    placeholder: "Wizard",
  },
  lastName: {
    type: "text",
    name: "lastName",
    text: "Last Name",
    placeholder: "Supermagic",
  },
  location: {
    type: "text",
    name: "location",
    text: "Home address",
    placeholder: "Home str. 1, Kaunas",
    inputLong: true,
  },
  username: {
    type: "text",
    name: "username",
    text: "Username",
    placeholder: "Super-wizard",
  },
  email: {
    type: "email",
    name: "email",
    text: "Email",
    placeholder: "email@example.com",
    inputLong: true,
  },
  password: {
    type: "password",
    name: "password",
    text: "Password",
    placeholder: "******",
  },
  repeatPassword: {
    type: "password",
    name: "repeatPassword",
    text: "Repeat Password",
    placeholder: "******",
  },
  birthday: {
    type: "date",
    name: "birthday",
    text: "Birth date",
    placeholder: "dd/mm/yyyy",
  },
};
fields.passwordLong = {
  ...fields.password,
  inputLong: true,
};
fields.oldPassword = {
  ...fields.password,
  text: "Current password",
  inputLong: true,
};
fields.newPassword = {
  ...fields.password,
  text: "New password",
};

export const loginForm = [fields.email, fields.passwordLong];
export const registerForm = [
  fields.firstName,
  fields.lastName,
  fields.email,
  fields.password,
  fields.repeatPassword,
];
export const accountForm = [
  fields.username,
  fields.birthday,
  fields.email,
  fields.location,
];
export const passwordsForm = [
  fields.oldPassword,
  fields.newPassword,
  fields.repeatPassword,
];
