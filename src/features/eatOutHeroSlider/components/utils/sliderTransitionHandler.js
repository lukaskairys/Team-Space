import { toggleAnimation } from "./toggleAnimation";

const sliderTransitionHandler = (
  currentIndex,
  counter,
  setAnimationLoading,
  isAnimationLoading,
  setCurrentIndex
) => {
  const slideLeft = () => {
    let newIndex = currentIndex;
    if (currentIndex === 0) newIndex = counter - 1;
    else newIndex = currentIndex - 1;
    transitionRestaurant(newIndex);
  };

  const slideRight = () => {
    let newIndex = currentIndex;
    if (currentIndex === counter - 1) newIndex = 0;
    else newIndex = currentIndex + 1;
    transitionRestaurant(newIndex);
  };

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

  return { slideLeft, slideRight, transitionRestaurant };
};

export default sliderTransitionHandler;
