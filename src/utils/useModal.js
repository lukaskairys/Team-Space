import { useState, useEffect } from "react";

export const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [ref, setRef] = useState("");
  useEffect(() => {
    ref && ref.current.focus();
  }, [ref, modalOpen]);

  const showModal = () => {
    setModalOpen(true);
    const scrollY = document.documentElement.style.getPropertyValue(
      "--scroll-y"
    );
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}`;
  };

  const closeModal = (ref) => {
    setModalOpen(false);
    const body = document.body;
    const scrollY = body.style.top;
    body.style.position = "";
    body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
    setRef(ref);
  };
  return {
    modalOpen,
    setModalOpen,
    showModal,
    closeModal,
  };
};
