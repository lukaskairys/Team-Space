import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import "./NewsFeedLayout.scss";
import useLayoutChildren from "./useLayoutChildren";

const NewsFeedLayout = ({ children }) => {
  const newsFeedSection = useRef(null);
  const [cards] = useLayoutChildren(children);

  const handleClick = (e) => {
    const birthdayCards = document.querySelectorAll(
      ".birthday-card.birthday-card--comments-displayed"
    );
    const birthdayCardsComments = document.querySelectorAll(
      ".birthday-comment-display"
    );

    if (
      e.currentTarget.classList.contains("news-feed-section") &&
      !e.target.classList.contains("comment-input") &&
      !e.target.classList.contains("button") &&
      !e.target.classList.contains("new-comment-container")
    ) {
      birthdayCardsComments.forEach((node) => {
        node.classList.add("d-none");
      });

      if (birthdayCards) {
        birthdayCards.forEach((node) => {
          node.classList.remove("birthday-card--comments-displayed");
        });
      }
    }
  };

  useEffect(() => {
    newsFeedSection.current.addEventListener("click", handleClick);
  }, []);

  return (
    <section className="news-feed" ref={newsFeedSection}>
      <h2 className="news-feed__title">News and Stories</h2>
      <div className="news-feed__content">{cards}</div>
    </section>
  );
};

NewsFeedLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default NewsFeedLayout;
