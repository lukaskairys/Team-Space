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
};

export const registerForm = [
  fields.firstName,
  fields.lastName,
  fields.email,
  fields.password,
  fields.repeatPassword,
];
