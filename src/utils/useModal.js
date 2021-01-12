import { useState, useEffect } from "react";

export const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [ref, setRef] = useState("");
  useEffect(() => {
    ref && ref.current && ref.current.focus();
  }, [ref, modalOpen]);

  const showModal = () => {
    setModalOpen(true);
    const body = document.body;
    body.style.overflow = "hidden";
  };

  const closeModal = (ref) => {
    setModalOpen(false);
    const body = document.body;
    body.style.overflowY = "visible";
    setRef(ref);
  };
  return {
    modalOpen,
    setModalOpen,
    showModal,
    closeModal,
  };
};
