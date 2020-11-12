import React from "react";
import "./Sidebar.scss";
import { ReactComponent as HomeIcon } from "assets/icons/home.svg";
import { ReactComponent as BookmarkIcon } from "assets/icons/bookmark.svg";
import { ReactComponent as CompassIcon } from "assets/icons/compass.svg";
import { ReactComponent as Logo } from "assets/logo-white.svg";

const SidebarData = [
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
    <nav className="Sidebar">
      <Logo className="Logo" />
      <div className="SidebarList">
        {SidebarData.map((val, key) => {
          return (
            <button
              key={key}
              className={`row ${
                window.location.pathname === val.link ? "active" : ""
              }`}
              onClick={() => {
                window.location.pathname = val.link;
              }}
              onKeyDown={() => {
                window.location.pathname = val.link;
              }}
            >
              <div className="icon">{val.icon}</div>
              <div className="title">{val.title}</div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
export default Sidebar;
