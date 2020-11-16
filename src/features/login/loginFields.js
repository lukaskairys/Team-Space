const fields = {
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
    inputLong: true,
  },
};

export const loginForm = [fields.email, fields.password];
