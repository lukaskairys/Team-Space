import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Button from "../../button/Button";
import "./eatOutCardFooter.scss";

function EatOutCardFooter({
  restaurantID,
  handleCheckIns,
  isCheckinActive,
  name,
}) {
  const handleScroll = () => {
    const element = document.querySelector("header");
    element.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  return (
    <div className="card-footer">
      <div className="card-footer__buttons">
        <Link
          onClick={handleScroll}
          to={`/eat-out/${restaurantID}`}
          className="button button--medium button--blank"
          aria-label={`Read more about the ${name} restaurant.`}
        >
          <span>read more</span>
        </Link>

        <Button
          handleClick={handleCheckIns}
          medium={true}
          ariaLabelText={
            isCheckinActive
              ? `Checkout from the ${name} restaurant.`
              : `Check in to the ${name} restaurant.`
          }
        >
          {isCheckinActive ? <span>check-out</span> : <span>check-in</span>}
        </Button>
      </div>
    </div>
  );
}

EatOutCardFooter.propTypes = {
  restaurantID: PropTypes.string,
  handleCheckIns: PropTypes.func,
  isCheckinActive: PropTypes.bool,
  name: PropTypes.string,
};

export default EatOutCardFooter;
