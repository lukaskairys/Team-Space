import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { toastOptions } from "./toastOptions";
import "./toast.scss";

import { ReactComponent as Checkmark } from "assets/icons/check.svg";
import { ReactComponent as Info } from "assets/icons/info.svg";
import { ReactComponent as XCircle } from "assets/icons/x-circle.svg";

export const successToast = (message) => {
  toast.success(
    <>
      <Checkmark className="Toastify__icon" />
      <span className="Toastify__text">{message}</span>
    </>,
    toastOptions
  );
};

export const infoToast = (message) => {
  toast.info(
    <>
      <Info />
      <span className="Toastify__text">{message}</span>
    </>,
    toastOptions
  );
};

export const warnToast = (message) => {
  toast.warn(
    <>
      <Info />
      <span className="Toastify__text">{message}</span>
    </>,
    toastOptions
  );
};

export const errorToast = (message) => {
  toast.error(
    <>
      <XCircle />
      <span className="Toastify__text">{message}</span>
    </>,
    toastOptions
  );
};
