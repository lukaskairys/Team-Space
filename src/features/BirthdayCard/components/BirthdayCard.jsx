import React from "react";
import PropTypes from "prop-types";
import "./birthdayCard.scss";
import { ReactComponent as ConfettiLeft } from "../../../assets/images/confetti-1.svg";
import { ReactComponent as ConfettiRight } from "../../../assets/images/confetti-2.svg";
import { ReactComponent as Sparkles } from "../../../assets/images/sparkles.svg";
import { ReactComponent as GiftIcon } from "../../../assets/icons/gift-icon.svg";
import { ReactComponent as CommentIcon } from "../../../assets/icons/comment-icon.svg";

function BirthdayCard({ story }) {
  return (
    <div className="birthday-card">
      <div className="birthday-card__image-container">
        <img
          className="birthday-card__image"
          src={story.userImage}
          alt="Birthday celebrant"
        />
      </div>
      <div className="birthday-card__content">
        <div className="birthday-card__title">
          <p>{story.userName}</p>
        </div>
        <div className="birthday-card__date">
          <p>
            Celebrated a birthday on
            <span className="birthday-card__date-day"> Sep 13th </span>
          </p>
        </div>
        <div className="birthday-card__body">
          <p>Send a wish!</p>
        </div>
        <div className="feed-card-divider"></div>
        <div className="interactions-container">
          <GiftIcon className="gift-icon" />
          <p>{story.wishes}</p>
          <CommentIcon className="comment-icon" />
          <p>{story.comments.length}</p>
        </div>
        <ConfettiLeft className="confetti-left" />
        <ConfettiRight className="confetti-right" />
        <Sparkles className="sparkles" />
      </div>
    </div>
  );
}

BirthdayCard.propTypes = {
  story: PropTypes.object,
};

export default BirthdayCard;
