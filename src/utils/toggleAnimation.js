export const toggleAnimation = (ref) => {
  const animatedElement = ref.current;
  if (!animatedElement) return;
  if (animatedElement.classList.contains("animate-in")) {
    animatedElement.classList.remove("animate-in");
    animatedElement.classList.add("animate-out");
  } else {
    animatedElement.classList.remove("animate-out");
    animatedElement.classList.add("animate-in");
  }
};
