import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import { ReactComponent as HomeIcon } from "assets/icons/home.svg";
import { ReactComponent as BookmarkIcon } from "assets/icons/bookmark.svg";
import { ReactComponent as CompassIcon } from "assets/icons/compass.svg";
import { ReactComponent as ToggleIcon } from "assets/icons/toggle.svg";
import { ReactComponent as Logo } from "assets/logo-white.svg";

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

const Sidebar = ({ sidebarState, showSidebar }) => {
  return (
    <nav className={sidebarState ? "sidebar sidebar--active" : "sidebar"}>
      <Logo className="sidebar__logo" />
      <button
        className="sidebar__toggle"
        onClick={() => {
          showSidebar();
        }}
      >
        <ToggleIcon />
      </button>
      <div className="sidebar__list">
        {sidebarData.map((val, key) => {
          return (
            <Link
              key={key}
              className={`sidebar__list-item ${
                window.location.pathname === val.link
                  ? "sidebar__list-item--active"
                  : ""
              }`}
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
  sidebarState: PropTypes.bool,
  showSidebar: PropTypes.func,
};

export default Sidebar;
