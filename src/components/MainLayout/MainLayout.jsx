import React from "react";
import "./MainLayout.scss";
import { ReactComponent as NotificationBell } from "assets/icons/notification-bell.svg";

const currentYear = new Date().getFullYear(); //getting current year

const MainLayout = () => {
  return (
    <div className="main-layout">
      <header className="main-layout__header">
        <div className="main-layout__status">
          <div className="main-layout__notifications">
            <NotificationBell className="main-layout__icon" />
          </div>
          <div className="main-layout__profile"></div>
        </div>
      </header>
      <main className="main-layout__main"></main>
      <footer className="main-layout__footer">
        <p className="main-layout__copyright">
          copyright &copy; {currentYear} devbridge
        </p>
      </footer>
    </div>
  );
};
export default MainLayout;
