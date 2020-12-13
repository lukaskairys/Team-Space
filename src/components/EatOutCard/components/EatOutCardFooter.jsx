import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Button from "../../button/Button";
import "./eatOutCardFooter.scss";

function EatOutCardFooter({ restaurantID, handleCheckIns, isCheckinActive }) {
  return (
    <div className="card-footer">
      <div className="card-footer__buttons">
        <Link
          to={`/eat-out/${restaurantID}`}
          className="button button--medium button--blank"
        >
          <span>read more</span>
        </Link>

        <Button handleClick={handleCheckIns} medium={true}>
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
};

export default EatOutCardFooter;
