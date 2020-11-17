import React from "react";

// const isOdd = (num) => {
//   return num % 2;
// };

let gridRowStyle = {
  firstAndThirdColumn: "2 / 4",
  secondColumn: "1 / 3",
};

// let iteration = 0;

// const changeGridRowStyle = (location) => {
//   if (location === "firstAndThirdColumn") {
//     let res = gridRowStyle.firstAndThirdColumn.split(" ").map((el) => {
//       const n = Number(el);
//       return isNaN(n) ? el : n;
//     });
//     res = res.map((el) => (typeof el === "number" ? el + 2 : el)).join(" ");
//     gridRowStyle.firstAndThirdColumn = res;
//   } else if (location === "secondColumn") {
//     let res = gridRowStyle.secondColumn.split(" ").map((el) => {
//       const n = Number(el);
//       return isNaN(n) ? el : n;
//     });
//     res = res.map((el) => (typeof el === "number" ? el + 2 : el)).join(" ");
//     gridRowStyle.secondColumn = res;
//   }
// };

const layoutChildren = (data) => {
  let result = data.map((child) => {
    if (child.props.type === "post") {
      return (
        <div style={{ gridRow: gridRowStyle.firstAndThirdColumn }}>{child}</div>
      );
    }
    if (child.props.type === "post1") {
      return <div style={{ gridRow: gridRowStyle.secondColumn }}>{child}</div>;
    } else {
      return child;
    }
  });
  return result;
};

export default layoutChildren;
