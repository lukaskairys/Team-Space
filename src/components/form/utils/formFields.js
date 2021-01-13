const fields = {
  firstName: {
    type: "text",
    name: "firstName",
    text: "First Name",
    placeholder: "Wizard",
    required: true,
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
    required: true,
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
    required: true,
  },
  repeatPassword: {
    type: "password",
    name: "repeatPassword",
    text: "Repeat Password",
    placeholder: "******",
    required: true,
  },
  currentPassword: {
    type: "password",
    name: "currentPassword",
    text: "Current Password",
    placeholder: "******",
    inputLong: true,
    required: true,
  },
  newPassword: {
    type: "password",
    name: "newPassword",
    text: "New Password",
    placeholder: "******",
    required: true,
  },
};
fields.passwordLong = {
  ...fields.password,
  inputLong: true,
  required: true,
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
  fields.currentPassword,
  fields.newPassword,
  fields.repeatPassword,
];

export const emailForm = [fields.email, fields.currentPassword];
