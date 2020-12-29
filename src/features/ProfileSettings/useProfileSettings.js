import bcrypt from "bcryptjs";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { isObjectEmpty } from "utils/objects";
import { hash } from "utils/hashPassword";
import { patch, deleteData } from "apis/services";

export const useProfileSettings = (user, setShowMessage, setMessageText) => {
  const history = useHistory();

  const changeAccountDetails = (dataToChange, setUser) => {
    let newData = {};

    for (const prop in dataToChange) {
      if (dataToChange[prop]) {
        newData = { ...dataToChange, [prop]: dataToChange[prop] };
      }
      if (dataToChange[prop] !== undefined) {
        setUser({ ...user, [prop]: dataToChange[prop] });
      }
    }

    if (!isObjectEmpty(newData)) {
      patch("/users", newData, user.id);
      toast.success("Your account was updated.");
      history.push("/settings");
    }
  };

  const changePassword = (passwords, user) => {
    const newHashed = hash(passwords.new);
    bcrypt.compare(passwords.old, user.password).then((result) => {
      if (result) {
        patch("/users", { password: newHashed }, user.id);
        toast.success("Password changed");
        history.push("/settings");
      } else {
        setShowMessage(true);
        setMessageText("Wrong current password. Please try again.");
      }
    });
  };

  const changeEmail = (email, password, user) => {
    bcrypt.compare(password, user.password).then((result) => {
      if (result) {
        patch("/users", { email: email }, user.id);
        toast.success("Email changed");
        history.push("/settings");
      } else {
        setShowMessage(true);
        setMessageText("Wrong password. Please try again.");
      }
    });
  };

  const deleteUser = () => {
    deleteData(`users/${user.id}`, user);
    localStorage.removeItem("user");
    history.push("/login");
    toast.success("Your account was deleted.");
  };

  return {
    changeAccountDetails,
    changePassword,
    deleteUser,
    changeEmail,
  };
};
