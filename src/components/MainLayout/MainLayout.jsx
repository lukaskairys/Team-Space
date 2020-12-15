import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { ReactComponent as NotificationBell } from "assets/icons/notification-bell.svg";
import Sidebar from "components/Sidebar/Sidebar";
import UserProfileWidget from "../../features/userProfileWidget/components/UserProfileWidget";
import UserContextProvider from "contexts/UserContextProvider";

import "./MainLayout.scss";

const creationYear = 2020;
const currentYear = new Date().getFullYear(); //getting current year
let year;
if (creationYear === currentYear) {
  year = creationYear;
} else {
  year = `${creationYear} - ${currentYear}`;
}

const checkSidebarState = () => {
  let initialState;
  if (sessionStorage.sidebarState === undefined) {
    initialState = false;
  } else {
    initialState = sessionStorage.sidebarState;
  }
  return JSON.parse(initialState);
};

const MainLayout = ({ children }) => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(checkSidebarState());

  const toggleSidebar = () => {
    setIsSidebarClosed(!isSidebarClosed);
  };
  sessionStorage.sidebarState = isSidebarClosed;
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
          <UserContextProvider>
            <div className="main-layout__status">
              <NotificationBell className="main-layout__notifications" />

              <div className="main-layout__profile">
                <UserProfileWidget />
              </div>
            </div>
          </UserContextProvider>
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
