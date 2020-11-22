import React from "react";
import PropTypes from "prop-types";

import "./NewsFeedLayout.scss";
import LayoutChildren from "./LayoutChildren";

const NewsFeedLayout = ({ children }) => {
  return (
    <section className="news-feed-section">
      <h2 className="news-feed-section__title">News and Stories</h2>
      <section className="news-feed-section__content">
        <LayoutChildren>{children}</LayoutChildren>
      </section>
    </section>
  );
};

NewsFeedLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default NewsFeedLayout;
