import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "assets/logo165.svg";

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
  const { width: windowWidth } = useWindowDimensions();
  const [isSmallerScreen, setSmallerScreen] = useState(false);
  const mainRef = useRef(null);
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
    <div className="main-layout">
      <UserContextProvider>
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
              <div className="main-layout__logo-container">
                <Link to="/">
                  <Logo className="main-layout__logo" />
                </Link>
              </div>
            )}
            {isSmallerScreen && (
              <Navigation isMobile={windowWidth <= mobileSize ? true : false} />
            )}
            <section className="main-layout__status">
              <NotificationBell className="main-layout__notifications" />

              <div className="main-layout__profile">
                <UserProfileWidget />
              </div>
            </section>
          </header>
          <main ref={mainRef} className="main-layout__main">
            {children}
          </main>
          <footer className="main-layout__footer">
            <p className="main-layout__copyright">
              copyright &copy; {year} devbridge
            </p>
          </footer>
        </div>
      </UserContextProvider>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.object,
};

export default MainLayout;
