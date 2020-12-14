import { toast } from "react-toastify";
import { toastOptions } from "./toastOptions";

export const warnToast = (message) => {
  toast.warn(message, {
    toastOptions,
  });
};
