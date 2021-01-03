import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { ReactComponent as NotificationBell } from "assets/icons/notification-bell.svg";
import Sidebar from "components/Sidebar/Sidebar";
import UserProfileWidget from "../../features/userProfileWidget/components/UserProfileWidget";
import useWindowDimensions from "utils/useWindowDimensions";
import UserContextProvider from "contexts/UserContextProvider";

import Navigation from "./Navigation";

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
  const { width: windowWidth } = useWindowDimensions(0);
  const [isSmallerScreen, setSmallerScreen] = useState(false);
  const mobileSize = 500;
  const maxWidth = 768;

  useEffect(() => {
    if (windowWidth <= maxWidth && isSmallerScreen === false) {
      setSmallerScreen(true);
    } else if (windowWidth > maxWidth && isSmallerScreen === true) {
      setSmallerScreen(false);
    }
  }, [windowWidth, isSmallerScreen]);

  const toggleSidebar = () => {
    setIsSidebarClosed(!isSidebarClosed);
  };

  sessionStorage.sidebarState = isSidebarClosed;
  return (
    <UserContextProvider>
      <div className="main-layout">
        {!isSmallerScreen && (
          <Sidebar
            isSidebarClosed={isSidebarClosed}
            toggleSidebar={toggleSidebar}
            isSmallerScreen={isSmallerScreen}
          />
        )}
        <div
          className={classNames("main-layout__content", {
            "main-layout__content--sidebar-closed": isSidebarClosed,
          })}
        >
          <header className="main-layout__header">
            {isSmallerScreen && (
              <Navigation isMobile={windowWidth <= mobileSize ? true : false} />
            )}
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
    </UserContextProvider>
  );
};

MainLayout.propTypes = {
  children: PropTypes.object,
};

export default MainLayout;
