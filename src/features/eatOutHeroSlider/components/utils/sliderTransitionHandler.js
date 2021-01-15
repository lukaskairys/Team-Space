import { toggleAnimation } from "./toggleAnimation";

const sliderTransitionHandler = (
  setAnimationLoading,
  isAnimationLoading,
  setCurrentIndex
) => {
  const transitionRestaurant = (i) => {
    if (!isAnimationLoading) {
      toggleAnimation();
      setAnimationLoading(true);

      setTimeout(function () {
        setCurrentIndex(i);
        const listBullets = document.getElementsByClassName(
          "slider-navigation__circle"
        );

        for (const el of listBullets) el.classList.remove("is_active");

        listBullets[i].classList.add("is_active");
      }, 250);
    }
  };

  return { transitionRestaurant };
};

export default sliderTransitionHandler;
