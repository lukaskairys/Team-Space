import React from "react";

const gridRowStyle = {
  addRows: function (value, n) {
    if (n === false) {
      return "";
    } else {
      return value
        .split(" ")
        .map((el) => {
          const n = Number(el);
          return isNaN(n) ? el : n;
        })
        .map((el) => (typeof el === "number" ? el + 3 * n : el))
        .join(" ");
    }
  },
};

const useLayoutChildren = (data) => {
  const smallCards = [];
  let bigCards = [];

  function chunkArrayInGroups(arr, size) {
    let myArray = [];
    for (var i = 0; i < arr.length; i += size) {
      myArray.push(arr.slice(i, i + size));
    }
    return myArray;
  }

  data.forEach((item) => {
    if (item.props.type === 1) {
      bigCards.push(item);
    } else {
      smallCards.push(item);
    }
  });

  bigCards = chunkArrayInGroups(bigCards, 3);

  let neww = bigCards.map((child, indexOfParent) => {
    return child.map((grandSon, index, childArr) => {
      if (index === 0) {
        return (
          <div
            key={index}
            style={{
              gridColumn: "1 / 2",
              gridRow: gridRowStyle.addRows(
                "2 / 4",
                childArr.length === 3 ? indexOfParent : false
              ),
            }}
          >
            {grandSon}
          </div>
        );
      } else if (index === 1) {
        return (
          <div
            key={index}
            style={{
              marginBottom: "3rem",
              gridColumn: "2 / 3",
              gridRow: gridRowStyle.addRows(
                "1 / 3",
                childArr.length === 3 ? indexOfParent : false
              ),
            }}
          >
            {grandSon}
          </div>
        );
      } else if (index === 2) {
        return (
          <div
            key={index}
            style={{
              marginBottom: "3rem",
              gridColumn: "3 / 4",
              gridRow: gridRowStyle.addRows(
                "2 / 4",
                childArr.length === 3 ? indexOfParent : false
              ),
            }}
          >
            {grandSon}
          </div>
        );
      } else {
        return grandSon;
      }
    });
  });
  return [...smallCards, ...neww];
};

export default useLayoutChildren;
