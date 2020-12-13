import { useState, useEffect } from "react";
import bcrypt from "bcryptjs";
import { useHistory, useLocation } from "react-router-dom";

import { useRequest } from "apis/useRequest";
import { generateID } from "utils/generateID";
import { post } from "apis/postData";

export const useAuthentication = () => {
  const [userId, setUserId] = useState();
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [messageText, setMessageText] = useState("Something went wrong");
  const { data } = useRequest("/users");
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const userFromLocal = JSON.parse(localStorage.getItem("user"));
    if (userFromLocal) setUserId(userFromLocal);
  }, [data]);

  function login(email, password) {
    try {
      // check email in db, and if exists - compare hashed passwords with bcrypt librarie
      const currentUser = data.filter((user) => user.email === email);
      if (currentUser && currentUser.length === 1) {
        bcrypt.compare(password, currentUser[0].password).then((result) => {
          if (result) {
            setUserId(currentUser[0].id);
            localStorage.setItem("user", JSON.stringify(currentUser[0].id));
            history.push(location.from ? location.from : "/", {
              message: "Your are successfully logged in. Welcome back!",
            });
          } else {
            setShowErrorMessage(true);
            setMessageText("Wrong password. Please try again.");
          }
        });
      } else {
        setShowErrorMessage(true);
        setMessageText("User with such email address does not exist.");
      }
    } catch (err) {
      setShowErrorMessage(true);
    }
  }

  const hash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  };

  async function register(password, dataToPost) {
    const hashedPassword = hash(password);
    dataToPost.password = hashedPassword;
    dataToPost.id = generateID();
    try {
      // post user object to db --> auto-login:
      // set user id for context, save id to localStorage and redirect to dashboard
      setIsPosting(true);
      await post("/users/", dataToPost);
      setIsPosting(false);
      setUserId(dataToPost.id);
      localStorage.setItem("user", JSON.stringify(dataToPost.id));
      history.push("/", {
        message: "You are successfully on board. Welcome!",
      });
    } catch (err) {
      setShowErrorMessage(true);
      setIsPosting(false);
    }
  }

  const logout = () => {
    localStorage.removeItem("user");
  };

  return {
    login,
    logout,
    register,
    isPosting,
    showErrorMessage,
    messageText,
    userId,
  };
};
