import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { ReactComponent as NotificationBell } from "assets/icons/notification-bell.svg";
import Sidebar from "components/Sidebar/Sidebar";
import UserProfileWidget from "../../features/userProfileWidget/components/UserProfileWidget";

import "./MainLayout.scss";

const creationYear = "(dark ages)";
const currentYear = new Date().getFullYear(); //getting current year
let year;
if (creationYear === currentYear) {
  year = creationYear;
} else {
  year = `${creationYear} - ${currentYear}`;
}

const MainLayout = ({ children }) => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarClosed(!isSidebarClosed);
  };

  return (
    <div className="main-layout">
      <Sidebar
        isSidebarClosed={isSidebarClosed}
        toggleSidebar={toggleSidebar}
      />
      <div
        className={classNames("main-layout__content", {
          "main-layout__content--sidebar-closed": isSidebarClosed,
        })}
      >
        <header className="main-layout__header">
          <div className="main-layout__status">
            <NotificationBell className="main-layout__notifications" />
            <div className="main-layout__profile">
              <UserProfileWidget />
            </div>
          </div>
        </header>
        <main className="main-layout__main">{children}</main>
        <footer className="main-layout__footer">
          <p className="main-layout__copyright">
            copyright &copy; {year} devbridge
          </p>
        </footer>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.object,
};

export default MainLayout;
