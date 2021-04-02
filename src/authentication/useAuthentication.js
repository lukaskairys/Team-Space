import { useState, useEffect } from "react";
import bcrypt from "bcryptjs";
import { v4 as generateID } from "uuid";
import { useHistory, useLocation } from "react-router-dom";

import { successToast } from "components/Toasts/ToastHandler";
import { useRequest } from "apis/useRequest";
import { hash } from "utils/hashPassword";
import { post } from "apis/services";

export const useAuthentication = (setShowMessage, setMessageText) => {
  const [userId, setUserId] = useState();
  const [isPosting, setIsPosting] = useState(false);
  const { data } = useRequest("/users");
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const userFromLocal = JSON.parse(localStorage.getItem("user"));
    if (userFromLocal) setUserId(userFromLocal);
  }, [data]);

  function getLoggingUser(email) {
    const user = data.filter((user) => user.email === email);
    return user;
  }

  function login(email, password) {
    if (data.length !== 0) {
      // check email in db, and if exists - compare hashed passwords with bcrypt librarie
      const loggingUser = getLoggingUser(email);
      if (loggingUser && loggingUser.length === 1) {
        bcrypt.compare(password, loggingUser[0].password).then((result) => {
          if (result) {
            setUserId(loggingUser[0].id);
            localStorage.setItem("user", JSON.stringify(loggingUser[0].id));
            history.push(
              location.from && location.from !== "/login"
                ? location.from
                : "/Team-Space"
            );
            successToast("Your are successfully logged in. Welcome back!");
          } else {
            setShowMessage(true);
            setMessageText("Wrong password. Please try again.");
          }
        });
      } else {
        setShowMessage(true);
        setMessageText("User with such email address does not exist.");
      }
    } else {
      setShowMessage(true);
    }
  }

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
      history.push("/Team-Space");
      successToast("You are now a registered member of Team Space. Welcome!");
    } catch (err) {
      setShowMessage(true);
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
    userId,
  };
};
