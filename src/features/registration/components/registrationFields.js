const fields = {
  firstName: {
    type: "text",
    name: "firstName",
    text: "First Name",
  },
  lastName: {
    type: "text",
    name: "lastName",
    text: "Last Name",
  },
  email: {
    type: "email",
    name: "email",
    text: "Email",
    inputLong: true,
  },
  password: {
    type: "password",
    name: "password",
    text: "Password",
  },
  repeatPassword: {
    type: "password",
    name: "repeatPassword",
    text: "Repeat Password",
  },
};

export const registerForm = [
  fields.firstName,
  fields.lastName,
  fields.email,
  fields.password,
  fields.repeatPassword,
];
