import React from "react";
import PropTypes from "prop-types";
import "./birthdayCard.scss";

function BirthdayCard({ title, imageUrl, body, date }) {
  return (
    <div className="card-container">
      <div className="image-container">
        <img src={imageUrl} alt="" />
      </div>
      <div className="card-content">
        <div className="card-title">
          <p>{title}</p>
        </div>
        <div className="card-date">
          <p>
            Celebrated a birthday on
            <span style={{ fontWeight: "500" }}> {date} </span>
          </p>
        </div>
        <div className="card-body">
          <p>{body}</p>
        </div>
        <div className="card-divider"></div>
      </div>
    </div>
  );
}

BirthdayCard.propTypes = {
  title: PropTypes.string,
  imageUrl: PropTypes.string,
  body: PropTypes.string,
  date: PropTypes.string,
};

export default BirthdayCard;
