import React from "react";

let gridRowStyle = {
  firstAndThirdColumn: "-1 / 1",
  secondColumn: "-2 / 0",
};

const changeGridRowStyle = () => {
  let res = gridRowStyle.firstAndThirdColumn
    .split(" ")
    .map((el) => {
      const n = Number(el);
      return isNaN(n) ? el : n;
    })
    .map((el) => (typeof el === "number" ? el + 3 : el))
    .join(" ");
  gridRowStyle.firstAndThirdColumn = res;

  let res2 = gridRowStyle.secondColumn
    .split(" ")
    .map((el) => {
      const n = Number(el);
      return isNaN(n) ? el : n;
    })
    .map((el) => (typeof el === "number" ? el + 3 : el))
    .join(" ");
  gridRowStyle.secondColumn = res2;
};

const layoutChildren = (data) => {
  let result = data.map((child, index) => {
    if (child.props.type === "post1") {
      return (
        <div
          key={index}
          style={{
            gridColumn: "1 / 2",
            gridRow: gridRowStyle.firstAndThirdColumn,
          }}
        >
          {child}
        </div>
      );
    }
    if (child.props.type === "post2") {
      return (
        <div
          key={index}
          style={{ gridColumn: "2 / 3", gridRow: gridRowStyle.secondColumn }}
        >
          {child}
        </div>
      );
    }
    if (child.props.type === "post3") {
      let result = (
        <div
          key={index}
          style={{
            gridColumn: "3 / 4",
            gridRow: gridRowStyle.firstAndThirdColumn,
          }}
        >
          {child}
        </div>
      );
      changeGridRowStyle();
      return result;
    } else {
      return child;
    }
  });
  return result;
};

export default layoutChildren;
