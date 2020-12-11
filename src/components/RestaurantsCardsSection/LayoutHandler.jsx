import { useEffect, useState, useCallback } from "react";

//functional component which calculates best card layout (items per page) according to free space based on two arguments - 1. Card Size.  2. Filled Space by cards.
export const LayoutHandler = (containerWidth) => {
  const [itemsPerPage, setItemsPerPage] = useState(0);

  const calculateItemsPerPage = useCallback(() => {
    const findBestLayout = (smallestCard, biggestCard) => {
      let highestScore = 0;
      let highestScoreLayout = 0;
      const gap = 40;
      const minLength = Math.floor(containerWidth / biggestCard); //minimum amount of cards in the page
      const maxLength = Math.floor(containerWidth / smallestCard); //maximum amount of cards in the page

      for (let i = minLength; i <= maxLength; i++) {
        let score = 0;
        const currentCardWidth = (containerWidth - gap * (i - 1)) / i;

        //score for the card size in the layout.
        const layoutCardWidth =
          currentCardWidth > biggestCard ? biggestCard : currentCardWidth;
        score += layoutCardWidth / biggestCard;

        //Score for the filled space of whole container for specific card layout
        const fillScore =
          (layoutCardWidth * i) / (containerWidth - gap * (i - 1));
        score += fillScore;

        if (score >= highestScore && layoutCardWidth >= smallestCard) {
          highestScore = score;
          highestScoreLayout = i;
        }
      }

      const perPage = highestScoreLayout > 0 ? highestScoreLayout : 1;
      setItemsPerPage(perPage);
      return perPage;
    };

    const smallestCard = "250";
    const biggestCard = "390";

    return findBestLayout(smallestCard, biggestCard);
  }, [containerWidth]);

  useEffect(() => {
    const perPage = calculateItemsPerPage();
    setItemsPerPage(perPage);
  }, [calculateItemsPerPage]);

  return itemsPerPage;
};
export default LayoutHandler;
