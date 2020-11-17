import React from "react";
import PropTypes from "prop-types";

import "./NewsFeedLayout.scss";
import layoutChildren from "./layoutChildren";

const NewsFeedLayout = ({ children }) => {
  return (
    <section className="news-feed-section">
      <h2 className="news-feed-section__title">News and Stories</h2>
      <section className="news-feed-section__content">
        {layoutChildren(children)}
      </section>
    </section>
  );
};

NewsFeedLayout.propTypes = {
  children: PropTypes.object,
};

export default NewsFeedLayout;
