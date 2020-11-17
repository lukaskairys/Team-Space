import React from "react";
import PropTypes from "prop-types";
import "./birthdayCard.scss";
import { ReactComponent as ConfettiLeft } from "../../assets/images/confetti-1.svg";
import { ReactComponent as ConfettiRight } from "../../assets/images/confetti-2.svg";
import { ReactComponent as Sparkles } from "../../assets/images/sparkles.svg";
import { ReactComponent as GiftIcon } from "../../assets/icons/gift-icon.svg";
import { ReactComponent as CommentIcon } from "../../assets/icons/comment-icon.svg";

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
        <div className="interactions-container">
          <GiftIcon className="gift-icon" />
          <CommentIcon className="comment-icon" />
        </div>
        <ConfettiLeft className="confetti-left" />
        <ConfettiRight className="confetti-right" />
        <Sparkles className="sparkles" />
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
