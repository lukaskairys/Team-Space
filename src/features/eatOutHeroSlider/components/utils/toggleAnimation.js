export const toggleAnimation = () => {
  const heroSlider = document.getElementsByClassName("eat-out-slider")[0];

  if (heroSlider.classList.contains("animate-out")) {
    heroSlider.classList.remove("animate-out");
    heroSlider.classList.add("animate-in");
  } else {
    heroSlider.classList.remove("animate-in");
    heroSlider.classList.add("animate-out");
  }
};
