import React from "react";

import Placeholder from "./Placeholder";

const gridRowStyle = {
  /**
   * @param {string} value - gridRow property ex.: "1 / 2", "2 / 4".
   * @param {(number|boolean)} n - number of times that gridRow property must be multiplied, for no multiplication provide false.
   * @param {number} m - number that will be subtracted from gridRow property.
   */
  addRows: function (value, n, m) {
    if (n === false) {
      return "";
    } else {
      return value
        .split(" ")
        .map((el) => {
          const n = Number(el);
          return isNaN(n) ? el : n;
        })
        .map((el) => (typeof el === "number" ? el + 3 * n - m : el))
        .join(" ");
    }
  },
};

const rearrangeCards = (bigCardsArr, smallCardsArr, width) => {
  let counter = 0; // Counter for counting the size of a number that should be subtracted from the gridRow prop
  let incrementStatus = true; // Check whether gridRow prop should be incremented or not and should the item have gridColumn prop
  let isThreeColumns = false;

  // Check whether there's gonna be 3 columns
  if (width > 1439) isThreeColumns = true;
  else isThreeColumns = false;

  // If there's 2, 4, 6 and so on... small cards, add a placeholder
  if (smallCardsArr[smallCardsArr.length - 1]) {
    if (
      smallCardsArr[smallCardsArr.length - 1].length === 2 ||
      smallCardsArr[smallCardsArr.length - 1].length === 1
    ) {
      if (width > 1090)
        smallCardsArr[smallCardsArr.length - 1].push(<Placeholder />);
    }
  }

  const smallCards = smallCardsArr.map(
    (setOfCards, setOfCardsIndex, smallCardsArr) => {
      if (smallCardsArr.length === 1) incrementStatus = false;
      return setOfCards.map((card, index) => {
        if (smallCardsArr[smallCardsArr.length - 2]) {
          if (
            smallCardsArr[smallCardsArr.length - 2] !== undefined ||
            smallCardsArr.length === 1
          ) {
            if (
              (index === 2 && setOfCards.length === 3) ||
              (index === 1 &&
                setOfCards.length === 2 &&
                smallCardsArr[smallCardsArr.length - 2].length !== 3) ||
              (index === 0 &&
                setOfCards.length === 1 &&
                smallCardsArr[smallCardsArr.length - 2].length !== 2 &&
                !isThreeColumns)
            ) {
              return (
                <div
                  className="birthday-card-wrapper"
                  key={index}
                  style={{
                    marginTop: "4rem",
                  }}
                >
                  {card}
                </div>
              );
            } else {
              return (
                <div className="birthday-card-wrapper" key={index}>
                  {card}
                </div>
              );
            }
          } else {
            return (
              <div className="birthday-card-wrapper" key={index}>
                {card}
              </div>
            );
          }
        } else {
          return (
            <div className="birthday-card-wrapper" key={index}>
              {card}
            </div>
          );
        }
      });
    }
  );

  const bigCards = bigCardsArr.map((setOfCards, setOfCardsIndex) => {
    if (smallCards[setOfCardsIndex] === undefined) {
      incrementStatus = false;
    }
    return setOfCards.map((card, index, setOfCardsArr) => {
      switch (index) {
        case 0:
          return (
            <div
              key={index}
              style={{
                gridRow: gridRowStyle.addRows(
                  "2 / 4",
                  incrementStatus ? setOfCardsIndex : false,
                  counter
                ),
                width: "100%",
              }}
            >
              {card}
            </div>
          );
        case 1:
          return (
            <div
              key={index}
              style={{
                gridColumn:
                  setOfCardsArr.length === 3 || setOfCardsArr.length === 2
                    ? incrementStatus
                      ? "2 / 3"
                      : ""
                    : "",
                gridRow: gridRowStyle.addRows(
                  "1 / 3",
                  setOfCardsArr.length === 3 || setOfCardsArr.length === 2
                    ? incrementStatus
                      ? setOfCardsIndex
                      : false
                    : false,
                  counter
                ),
                width: "100%",
              }}
            >
              {card}
            </div>
          );
        case 2:
          return (
            <div
              key={index}
              style={{
                gridColumn:
                  setOfCards.length === 3
                    ? incrementStatus
                      ? "3 / 4"
                      : ""
                    : "",
                gridRow: gridRowStyle.addRows(
                  "2 / 4",
                  setOfCardsArr.length === 3
                    ? incrementStatus
                      ? setOfCardsIndex
                      : false
                    : false,
                  counter
                ),
                width: "100%",
              }}
            >
              {card}
            </div>
          );
        default:
          return card;
      }
    });
  });
  return [...smallCards, ...bigCards];
};

export default rearrangeCards;
