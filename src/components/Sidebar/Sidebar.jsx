import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { ReactComponent as HomeIcon } from "assets/icons/home.svg";
import { ReactComponent as BookmarkIcon } from "assets/icons/bookmark.svg";
import { ReactComponent as CompassIcon } from "assets/icons/compass.svg";
import { ReactComponent as ToggleIcon } from "assets/icons/toggle.svg";
import { ReactComponent as Logo } from "assets/logo-white.svg";

import "./Sidebar.scss";
import {
  sidebarClose,
  sidebarOpen,
  setToClosed,
  setToOpened,
} from "./sidebarAnimations";

const sidebarData = [
  {
    title: "Dashboard",
    icon: <HomeIcon className="sidebar__list-icon" />,
    link: "/Team-Space",
  },
  {
    title: "Reservations",
    icon: <BookmarkIcon className="sidebar__list-icon" />,
    link: "/reservations",
  },
  {
    title: "Eat-Out",
    icon: <CompassIcon className="sidebar__list-icon" />,
    link: "/eat-out",
  },
];

const Sidebar = ({ isSidebarClosed, toggleSidebar }) => {
  const handleAnimation = () => {
    isSidebarClosed ? sidebarOpen() : sidebarClose();
  };

  useEffect(() => {
    isSidebarClosed ? setToClosed() : setToOpened();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav
      className={classNames("sidebar", {
        "sidebar--closed": isSidebarClosed,
      })}
      aria-label="Primary"
    >
      <Link
        className="sidebar__logo-container"
        to="/Team-Space"
        aria-label="Logo of Team Space, go back to main page."
      >
        <Logo className="sidebar__logo" />
      </Link>
      <button
        className="sidebar__toggle"
        aria-label="Toggle sidebar."
        onClick={() => {
          handleAnimation();
          toggleSidebar();
        }}
      >
        <ToggleIcon className="sidebar__toggle-icon" />
      </button>
      <div className="sidebar__list">
        {sidebarData.map((val, key) => {
          return (
            <Link
              key={key}
              className={classNames("sidebar__list-item", {
                "sidebar__list-item--active":
                  window.location.pathname === val.link ||
                  window.location.pathname.includes(val.title.toLowerCase()),
              })}
              to={val.link}
            >
              <i className="sidebar__list-icon-container">{val.icon}</i>
              <span className="sidebar__corner-top"></span>
              <span className="sidebar__corner-bottom"></span>
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
  isMobile: PropTypes.bool,
  closeRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  hamburgerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default Sidebar;
