import { useState, useEffect } from "react";
import bcrypt from "bcryptjs";
import { useHistory } from "react-router-dom";

import { post } from "apis/postData";

export const useAuthentication = (setId, data) => {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [messageText, setMessageText] = useState("Something went wrong");
  const history = useHistory();

  const userFromLocal = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    userFromLocal && setId(userFromLocal);
    // eslint-disable-next-line
  }, [data]);

  function login(email, password) {
    if (showErrorMessage) return;
    const currentUser = data.filter((user) => user.email === email);
    if (currentUser && currentUser.length === 1) {
      bcrypt
        .compare(password, currentUser[0].password)
        .then((result) => {
          if (result) {
            setId(currentUser[0].id);

            localStorage.setItem("user", JSON.stringify(currentUser[0].id));

            history.push("/", {
              message: "Your are successfully logged in. Welcome back!",
            });
          } else {
            setShowErrorMessage(true);
            setMessageText("Wrong password. Please try again.");
          }
        })
        .catch((error) => {
          setShowErrorMessage(true);
        });
    } else {
      setShowErrorMessage(true);
      setMessageText("User with such email address does not exist.");
    }
  }

  const hash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  };

  async function register(password, dataToPost) {
    try {
      const hashedPassword = hash(password);
      dataToPost.password = hashedPassword;
      await post("/users/", dataToPost);

      // TODO: make auto-login
      // dabar loginasi belekuris useris??????
      // jei cia iskvieciu login() - meta klaidas kad tokie email ir password neegzistuoja
      history.push("/", {
        message:
          "Your registration was successful. For a better experience of using Team Space, please fill in extra information in your account settings.",
      });
    } catch (error) {
      setShowErrorMessage(true);
    }
  }

  const logout = () => {
    localStorage.removeItem("user");
  };

  return {
    login,
    logout,
    register,
    showErrorMessage,
    messageText,
  };
};
