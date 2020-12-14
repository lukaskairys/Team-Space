import React, { useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./birthdayCard.scss";
import BirthdayComments from "./BirthdayComments";
import { getBirthdayDate } from "./getBirthdayDate";
import { ReactComponent as ConfettiLeft } from "../../../assets/images/confetti-1.svg";
import { ReactComponent as ConfettiRight } from "../../../assets/images/confetti-2.svg";
import { ReactComponent as Sparkles } from "../../../assets/images/sparkles.svg";

function BirthdayCard({ story, userPhoto, userName }) {
  const birthdayCard = useRef(null);

  const heartClass = classNames({
    "birthday-card": true,
  });

  const toggleFavorite = () => {
    birthdayCard.current.classList.toggle("birthday-card--comments-displayed");
  };

  return (
    <div className={heartClass} id={story.id} ref={birthdayCard}>
      <div className="birthday-card__image-container">
        <img
          className="birthday-card__image"
          src={story.userImage}
          alt="Birthday celebrant"
        />
      </div>
      <div className="birthday-card__content">
        <div className="birthday-card__title">{story.userName}</div>
        <div className="birthday-card__date">
          Celebrated a birthday on
          <span className="birthday-card__date-day">
            {getBirthdayDate(story.birthdayDate)}
          </span>
        </div>
        <div className="birthday-card__body">Send a wish!</div>
        <ConfettiLeft className="confetti-left" />
        <ConfettiRight className="confetti-right" />
        <Sparkles className="sparkles" />
        <div className="feed-card-divider"></div>
        <BirthdayComments
          comments={story.comments}
          username={userName}
          userPhoto={userPhoto}
          wishes={story.wishes}
          containerId={story.id}
          onCommentClick={toggleFavorite}
        />
      </div>
    </div>
  );
}

BirthdayCard.propTypes = {
  story: PropTypes.shape({
    id: PropTypes.string,
    userImage: PropTypes.string,
    userName: PropTypes.string,
    userPhoto: PropTypes.string,
    birthdayDate: PropTypes.string,
    comments: PropTypes.array,
    wishes: PropTypes.number,
  }),
  userName: PropTypes.string,
  userPhoto: PropTypes.string,
};

export default BirthdayCard;
