import React from "react";

import "./personCounter.scss";
import { ReactComponent as PersonIcon } from "assets/icons/person.svg";

const Person = (counter) => {
  return (
    <div className="person-container">
      <div className="person-container__items">
        <PersonIcon className="person-container__icon" />
        <span className="person-container__counter">{counter}</span>
      </div>
    </div>
  );
};

export default Person;
