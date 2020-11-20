import React from "react";
import PropTypes from "prop-types";
import "./birthdayCard.scss";
import { ReactComponent as ConfettiLeft } from "../../../assets/images/confetti-1.svg";
import { ReactComponent as ConfettiRight } from "../../../assets/images/confetti-2.svg";
import { ReactComponent as Sparkles } from "../../../assets/images/sparkles.svg";
import { ReactComponent as GiftIcon } from "../../../assets/icons/gift-icon.svg";
import { ReactComponent as CommentIcon } from "../../../assets/icons/comment-icon.svg";

function BirthdayCard({ title, imageUrl, body, date, wishes, comments }) {
  return (
    <div className="birthday-card">
      <div className="birthday-card__image-container">
        <img
          className="birthday-card__image"
          src={imageUrl}
          alt="Birthday celebrant"
        />
      </div>
      <div className="birthday-card__content">
        <div className="birthday-card__title">
          <p>{title}</p>
        </div>
        <div className="birthday-card__date">
          <p>
            Celebrated a birthday on
            <span className="birthday-card__date-day"> {date} </span>
          </p>
        </div>
        <div className="birthday-card__body">
          <p>{body}</p>
        </div>
        <div className="feed-card-divider"></div>
        <div className="interactions-container">
          <GiftIcon className="gift-icon" />
          <p>{wishes}</p>
          <CommentIcon className="comment-icon" />
          <p>{comments}</p>
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
  wishes: PropTypes.number,
  comments: PropTypes.number,
};

export default BirthdayCard;
