const fields = {
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
    inputLong: true,
  },
};

export const loginForm = [fields.email, fields.password];
