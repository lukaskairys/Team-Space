import useWindowDimensions from "utils/useWindowDimensions";
import groupArray from "utils/groupArray";

import rearrangeCards from "./rearrangeCards";

const useLayoutChildren = (children) => {
  const { width } = useWindowDimensions();
  let smallCardsTemp = [];
  let bigCardsTemp = [];
  if (children) {
    children.forEach((item) => {
      if (item.props.type === 1) {
        bigCardsTemp.push(item);
      } else {
        smallCardsTemp.push(item);
      }
    });

    // Take an array of children and group it by screen size
    if (width <= 1500 && width > 1090) {
      bigCardsTemp = groupArray(bigCardsTemp, 2);
      smallCardsTemp = groupArray(smallCardsTemp, 2);
    } else if (width <= 1090) {
      bigCardsTemp = groupArray(bigCardsTemp, 1);
      smallCardsTemp = groupArray(smallCardsTemp, 1);
    } else {
      bigCardsTemp = groupArray(bigCardsTemp, 3);
      smallCardsTemp = groupArray(smallCardsTemp, 3);
    }

    const cards = rearrangeCards(bigCardsTemp, smallCardsTemp, width);

    return [cards];
  } else {
    return null;
  }
};

export default useLayoutChildren;
