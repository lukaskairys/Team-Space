import React from "react";
import "./Sidebar.scss";
import { ReactComponent as HomeIcon } from "assets/icons/home.svg";
import { ReactComponent as BookmarkIcon } from "assets/icons/bookmark.svg";
import { ReactComponent as CompassIcon } from "assets/icons/compass.svg";
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

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <Logo className="sidebar__logo" />
      <div></div>
      <div className="sidebar__list">
        {sidebarData.map((val, key) => {
          return (
            <button
              key={key}
              className={`sidebar__list-item ${
                window.location.pathname === val.link
                  ? "sidebar__list-item--active"
                  : ""
              }`}
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <i className="sidebar__icon">{val.icon}</i>
              <span className="sidebar__item-title">{val.title}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
export default Sidebar;
