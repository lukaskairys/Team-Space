import React from "react";

import useWindowDimensions from "./useWindowDimensions";

function groupArray(arr, size) {
  let groupedArr = [];
  for (let i = 0; i < arr.length; i += size) {
    groupedArr.push(arr.slice(i, i + size));
  }
  return groupedArr;
}

const gridRowStyle = {
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

const LayoutChildren = ({ children }) => {
  const { width } = useWindowDimensions();
  let smallCardsTemp = [];
  let bigCardsTemp = [];
  let counter = 0;

  children.forEach((item) => {
    if (item.props.type === 1) {
      bigCardsTemp.push(item);
    } else {
      smallCardsTemp.push(item);
    }
  });

  if (width < 1500 && width > 1080) {
    bigCardsTemp = groupArray(bigCardsTemp, 2);
    smallCardsTemp = groupArray(smallCardsTemp, 2);
  } else if (width <= 1080) {
    bigCardsTemp = groupArray(bigCardsTemp, 1);
    smallCardsTemp = groupArray(smallCardsTemp, 1);
  } else {
    bigCardsTemp = groupArray(bigCardsTemp, 3);
    smallCardsTemp = groupArray(smallCardsTemp, 3);
  }

  const smallCards = smallCardsTemp.map((setOfCards, setOfCardsIndex, arr) => {
    return setOfCards.map((card, index) => {
      if (
        (index === 2 && setOfCards.length === 3) ||
        (index === 1 &&
          setOfCards.length === 2 &&
          arr[arr.length - 2].length !== 3) ||
        (index === 0 &&
          setOfCards.length === 1 &&
          arr[arr.length - 2].length !== 2)
      )
        return (
          <div
            key={index}
            style={{
              marginTop: "3rem",
            }}
          >
            {card}
          </div>
        );
      else return card;
    });
  });

  const bigCards = bigCardsTemp.map((setOfCards, setOfCardsIndex) => {
    if (smallCards[setOfCardsIndex] === undefined) counter++;
    return setOfCards.map((card, index, setOfCardsArr) => {
      switch (index) {
        case 0:
          return (
            <div
              key={index}
              style={{
                gridRow: gridRowStyle.addRows(
                  "2 / 4",
                  setOfCardsIndex,
                  counter
                ),
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
                    ? "2 / 3"
                    : "",
                gridRow: gridRowStyle.addRows(
                  "1 / 3",
                  setOfCardsArr.length === 3 || setOfCardsArr.length === 2
                    ? setOfCardsIndex
                    : false,
                  counter
                ),
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
                gridColumn: setOfCards.length === 3 ? "3 / 4" : "",
                gridRow: gridRowStyle.addRows(
                  "2 / 4",
                  setOfCardsArr.length === 3 ? setOfCardsIndex : false,
                  counter
                ),
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

export default LayoutChildren;
