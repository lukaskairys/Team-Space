import bcrypt from "bcryptjs";
import { useHistory } from "react-router-dom";

import { successToast } from "components/Toasts/ToastHandler";
import { isObjectEmpty } from "utils/objects";
import { hash } from "utils/hashPassword";
import { patch, deleteData } from "apis/services";

export const useProfileSettings = (user) => {
  const history = useHistory();

  const changeAccountDetails = (dataToChange, setUser) => {
    let newData = {};

    for (const prop in dataToChange) {
      if (dataToChange[prop]) {
        newData = { ...newData, [prop]: dataToChange[prop] };
      }
    }

    setUser({ ...user, ...newData });

    if (!isObjectEmpty(newData)) {
      patch("/users", newData, user.id);
      successToast("Your account was updated.");
      history.push("/settings");
    }
  };

  const changePassword = (passwords, user, setUser) => {
    const newHashed = hash(passwords.new);
    bcrypt.compare(passwords.old, user.password).then((result) => {
      if (result) {
        patch("/users", { password: newHashed }, user.id);
        successToast("Password changed");
        history.push("/settings");
        setUser({ ...user, password: newHashed });
      } else {
        setUser(user);
      }
    });
  };

  const changeEmail = (email, password, user, setUser) => {
    bcrypt.compare(password, user.password).then((result) => {
      if (result) {
        patch("/users", { email: email }, user.id);
        successToast("Email changed");
        history.push("/settings");
        setUser({ ...user, email: email });
      } else {
        setUser(user);
      }
    });
  };

  const deleteUser = () => {
    deleteData(`users/${user.id}`, user);
    localStorage.removeItem("user");
    history.push("/login");
    successToast("Your account was deleted.");
  };

  return {
    changeAccountDetails,
    changePassword,
    deleteUser,
    changeEmail,
  };
};
