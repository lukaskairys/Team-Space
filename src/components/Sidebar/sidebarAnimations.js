import gsap from "gsap";

const ease = "power1.out";
const duration = 1;

export const sidebarClose = () => {
  gsap.to(".sidebar", {
    width: "9.6rem",
    duration: duration,
    ease: ease,
  });
  gsap.to(".main-layout__content", {
    "margin-left": "9.6rem",
    duration: duration,
    ease: ease,
  });
  gsap.to(".sidebar__toggle", {
    rotation: 180,
    x: "-11rem",
    duration: duration,
    ease: ease,
  });
};

export const sidebarOpen = () => {
  gsap.to(".sidebar", {
    width: "20.6rem",
    duration: duration,
    ease: ease,
  });
  gsap.to(".main-layout__content", {
    "margin-left": "20.6rem",
    duration: duration,
    ease: ease,
  });
  gsap.to(".sidebar__toggle", {
    rotation: 0,
    x: 0,
    duration: duration,
    ease: ease,
  });
};
