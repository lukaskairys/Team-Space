import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Button from "components/button/Button";

import { ReactComponent as PersonIcon } from "assets/icons/person.svg";

import "./personCounter.scss";

const Person = ({ checkinHandler, name }) => {
  const { active, toggleCheckIn, checkIns } = checkinHandler;
  const PersonClass = classNames({
    "person-container": true,
    "person-container--active": active,
  });

  return (
    <div className={PersonClass}>
      <Button
        empty={true}
        handleClick={toggleCheckIn}
        ariaLabelText={
          active
            ? `Checkout from the ${name} restaurant. Check in count: ${checkIns}`
            : `Check in to the ${name} restaurant. Check in count: ${checkIns}`
        }
      >
        <PersonIcon className="person-container__icon" />
        {checkIns}
      </Button>
    </div>
  );
};

Person.propTypes = {
  checkinHandler: PropTypes.shape({
    active: PropTypes.bool,
    toggleCheckIn: PropTypes.func,
    checkIns: PropTypes.number,
  }),
  name: PropTypes.string,
};

export default Person;
