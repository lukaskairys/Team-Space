import React from "react";
import PropTypes from "prop-types";
import { ToastContainer, Zoom } from "react-toastify";

import { ReactComponent as X } from "assets/icons/x-bold.svg";

const CloseButton = ({ closeToast }) => (
  <X onClick={closeToast} className="Toastify__close-buttons" />
);

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
      closeButton={<CloseButton />}
    />
  );
};

CloseButton.propTypes = {
  closeToast: PropTypes.func,
};

export default Toast;
