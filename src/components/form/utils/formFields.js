const fields = {
  firstName: {
    type: "text",
    name: "firstName",
    text: "First Name",
    placeholder: "Wizard",
  },
  lastName: {
    type: "text",
    name: "lastName",
    text: "Last Name",
    placeholder: "Supermagic",
  },
  location: {
    type: "text",
    name: "location",
    text: "Home address",
    placeholder: "Home str. 1, Kaunas",
    inputLong: true,
  },
  userName: {
    type: "text",
    name: "userName",
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
  birthday: {
    type: "date",
    name: "birthday",
    text: "Date of birth",
    placeholder: "dd/mm/yyyy",
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
    text: "Repeat Password",
    placeholder: "******",
  },
  oldPassword: {
    type: "password",
    name: "oldPassword",
    text: "Current Password",
    placeholder: "******",
    inputLong: true,
  },
  newPassword: {
    type: "password",
    name: "newPassword",
    text: "New Password",
    placeholder: "******",
  },
};
fields.passwordLong = {
  ...fields.password,
  inputLong: true,
};
export const loginForm = [fields.email, fields.passwordLong];
export const registerForm = [
  fields.firstName,
  fields.lastName,
  fields.email,
  fields.password,
  fields.repeatPassword,
];
export const accountForm = [fields.userName, fields.birthday, fields.location];
export const passwordsForm = [
  fields.oldPassword,
  fields.newPassword,
  fields.repeatPassword,
];

export const emailForm = [fields.email, fields.oldPassword];
