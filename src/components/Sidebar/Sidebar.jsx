import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { ReactComponent as HomeIcon } from "assets/icons/home.svg";
import { ReactComponent as BookmarkIcon } from "assets/icons/bookmark.svg";
import { ReactComponent as CompassIcon } from "assets/icons/compass.svg";
import { ReactComponent as ToggleIcon } from "assets/icons/toggle.svg";
import { ReactComponent as Logo } from "assets/logo-white.svg";

import "./Sidebar.scss";

const sidebarData = [
  {
    title: "Dashboard",
    icon: <HomeIcon />,
    link: "/",
  },
  {
    title: "Reservations",
    icon: <BookmarkIcon />,
    link: "/reservations",
  },
  {
    title: "Eat-Out",
    icon: <CompassIcon />,
    link: "/registration",
  },
];

const Sidebar = ({ isSidebarClosed, toggleSidebar }) => {
  return (
    <nav
      className={classNames("sidebar", {
        "sidebar--closed": isSidebarClosed,
      })}
    >
      <Logo className="sidebar__logo" />
      <button
        className="sidebar__toggle"
        onClick={() => {
          toggleSidebar();
        }}
      >
        <ToggleIcon />
      </button>
      <div className="sidebar__list">
        {sidebarData.map((val, key) => {
          return (
            <Link
              key={key}
              className={classNames("sidebar__list-item", {
                "sidebar__list-item--active":
                  window.location.pathname === val.link,
              })}
              to={val.link}
            >
              <i className="sidebar__icon">{val.icon}</i>
              <span className="sidebar__corner"></span>
              <span className="sidebar__item-title">{val.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

Sidebar.propTypes = {
  isSidebarClosed: PropTypes.bool,
  toggleSidebar: PropTypes.func,
};

export default Sidebar;
