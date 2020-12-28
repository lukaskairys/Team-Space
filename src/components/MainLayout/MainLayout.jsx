import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { ReactComponent as NotificationBell } from "assets/icons/notification-bell.svg";
import Sidebar from "components/Sidebar/Sidebar";
import UserProfileWidget from "../../features/userProfileWidget/components/UserProfileWidget";
import { ReactComponent as Hamburger } from "assets/images/hamburger.svg";
import useWindowDimensions from "utils/useWindowDimensions";
import UserContextProvider from "contexts/UserContextProvider";
import Button from "components/button/Button";

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
  const [isMobile, setMobile] = useState(false);
  const closeRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    if (windowWidth <= 500 && isMobile === false) {
      setMobile(true);
    } else if (windowWidth > 500 && isMobile === true) {
      setMobile(false);
    }
  }, [windowWidth, isMobile]);

  const toggleSidebar = async (burgerRef) => {
    await setIsSidebarClosed(!isSidebarClosed);
    if (burgerRef !== undefined) {
      setFocus(burgerRef);
    }
  };

  const handleHamburger = async () => {
    await setIsSidebarClosed(false);
    setFocus(closeRef);
  };

  const setFocus = (ref) => {
    ref.current && ref.current.focus();
  };

  sessionStorage.sidebarState = isSidebarClosed;
  return (
    <UserContextProvider>
      <div className="main-layout">
        <Sidebar
          isSidebarClosed={isSidebarClosed}
          toggleSidebar={toggleSidebar}
          is_mobile={isMobile}
          closeRef={closeRef}
          hamburgerRef={hamburgerRef}
        />
        <div
          className={classNames("main-layout__content", {
            "main-layout__content--sidebar-closed": isSidebarClosed,
            is_mobile: isMobile,
          })}
        >
          <header className="main-layout__header">
            <div className="main-layout__mobile-navigation">
              <Button
                id="menu-toggle"
                empty={true}
                mobileNavToggle={true}
                ariaLabel="Open the menu"
                handleClick={handleHamburger}
                buttonRef={hamburgerRef}
              >
                <Hamburger
                  aria-hidden="true"
                  className={classNames({
                    is_mobile: isMobile,
                  })}
                />
              </Button>
            </div>
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
