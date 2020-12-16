import React from "react";
import { ToastContainer, Zoom } from "react-toastify";

const Toast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      transition={Zoom}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      background="#34A853"
    />
  );
};

export default Toast;
