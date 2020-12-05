// import React, { useCallback } from "react";

// const LayoutHandler = () => {
//   const calculateItemsPerPage = useCallback(() => {
//     const calculateSmallCardScore = (
//       countOfBigCards,
//       countOfSmallCards,
//       biggestCard
//     ) => {
//       let maxSmallCardScore = 0;
//       let calculateItemsPerPage = 0;
//       for (let i = countOfBigCards; i <= countOfSmallCards; i++) {
//         let score = 0;
//         const expandedCardWidth = containerWidth / i;

//         const smallerCardWith =
//           expandedCardWidth > biggestCard ? biggestCard : expandedCardWidth;
//         score += smallerCardWith / biggestCard;

//         const fillScoreSmallCard = (smallerCardWith * i) / containerWidth;
//         score += fillScoreSmallCard;

//         if (score > maxSmallCardScore) {
//           maxSmallCardScore = score;
//           calculateItemsPerPage = i;
//         }
//       }
//       const perPage = calculateItemsPerPage > 0 ? calculateItemsPerPage : 1;
//       setItemsPerPage(perPage);
//       return perPage;
//     };

//     const smallestCard = 330;
//     const biggestCard = 390;
//     const countOfBigCards = Math.floor(containerWidth / biggestCard); //minimum amount of cards in the page
//     const countOfSmallCards = Math.floor(containerWidth / smallestCard); //maximum amount of cards in the page
//     return calculateSmallCardScore(
//       countOfBigCards,
//       countOfSmallCards,
//       biggestCard
//     );
//   }, [containerWidth]);
// };
