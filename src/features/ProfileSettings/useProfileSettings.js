import bcrypt from "bcryptjs";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { hash } from "utils/hashPassword";
import { patch, deleteData } from "apis/services";

export const useProfileSettings = (user, setShowMessage, setMessageText) => {
  const history = useHistory();

  const changeAccountDetails = (dataToChange) => {
    for (const prop in dataToChange) {
      const newData = { [prop]: dataToChange[prop] };
      if (dataToChange[prop]) {
        patch("/users", newData, user.id);
        toast.success("Your account was updated.");
        history.push("/settings");
      }
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
  };
};
