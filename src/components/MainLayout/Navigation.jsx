import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { ReactComponent as HomeIcon } from "assets/icons/home.svg";
import { ReactComponent as BookmarkIcon } from "assets/icons/bookmark.svg";
import { ReactComponent as CompassIcon } from "assets/icons/compass.svg";
import { Link } from "react-router-dom";

import "./navigation.scss";

const navigationData = [
  {
    title: "Dashboard",
    icon: <HomeIcon className="navigation-list__icon" />,
    link: "/",
  },
  {
    title: "Reservations",
    icon: <BookmarkIcon className="navigation-list__icon" />,
    link: "/reservations",
  },
  {
    title: "Eat-Out",
    icon: <CompassIcon className="navigation-list__icon" />,
    link: "/eat-out",
  },
];

const Navigation = ({ isMobile }) => {
  return (
    <>
      <nav className="navigation-list" aria-label="Primary">
        {navigationData.map((val, key) => {
          return (
            <Link
              key={key}
              className={classNames("navigation-list__item", {
                is_active:
                  window.location.pathname === val.link ||
                  window.location.pathname.includes(val.title.toLowerCase()),
              })}
              to={val.link}
            >
              <i className="navigation-list__icon-container">{val.icon}</i>
              {!isMobile && (
                <span className="navigation-list__title">{val.title}</span>
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
};

Navigation.propTypes = {
  isMobile: PropTypes.bool,
};
export default Navigation;
