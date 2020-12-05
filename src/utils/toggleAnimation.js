export const toggleAnimation = (ref) => {
  const animatedElement = ref.current;
  if (!animatedElement) return;
  if (animatedElement.classList.contains("animate-out")) {
    animatedElement.classList.remove("animate-out");
    animatedElement.classList.add("animate-in");
  } else {
    animatedElement.classList.remove("animate-in");
    animatedElement.classList.add("animate-out");
  }
};
