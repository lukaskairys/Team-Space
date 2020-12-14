import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "react-toastify/dist/ReactToastify.css";
import { ReactComponent as PersonIcon } from "assets/icons/person.svg";

import "./personCounter.scss";

const Person = ({ checkinHandler }) => {
  const { active, toggleCheckIn, checkIns } = checkinHandler;
  const PersonClass = classNames({
    "person-container": true,
    "person-container--active": active,
  });

  return (
    <div
      onClick={toggleCheckIn}
      onKeyDown={toggleCheckIn}
      role="button"
      tabIndex="0"
      className={PersonClass}
    >
      <div className="person-container__items">
        <PersonIcon className="person-container__icon" />
        <span className="person-container__counter">{checkIns}</span>
      </div>
    </div>
  );
};

Person.propTypes = {
  checkinHandler: PropTypes.shape({
    active: PropTypes.bool,
    toggleCheckIn: PropTypes.func,
    checkIns: PropTypes.number,
  }),
};

export default Person;
