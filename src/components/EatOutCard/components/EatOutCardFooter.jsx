import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Button from "../../button/Button";
import "./eatOutCardFooter.scss";

function EatOutCardFooter({ restaurantID }) {
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
          className="card-footer__link"
          tabIndex={-1}
        >
          <Button medium={true} blank={true}>
            <span>read more</span>
          </Button>
        </Link>

        <Button medium={true}>
          <span>check-in</span>
        </Button>
      </div>
    </div>
  );
}

EatOutCardFooter.propTypes = {
  restaurantID: PropTypes.string,
};

export default EatOutCardFooter;
