import React from "react";
import "./MainLayout.scss";
import { ReactComponent as NotificationBell } from "assets/icons/notification-bell.svg";

const MainLayout = () => {
  return (
    <div className="MainLayout">
      <header className="MainLayout__header">
        <div className="MainLayout__status">
          <div className="MainLayout__notifications">
            <NotificationBell className="MainLayout__icon" />
          </div>
          <div className="MainLayout__profile"></div>
        </div>
      </header>
      <main className="MainLayout__main"></main>
      <footer className="MainLayout__footer">
        <p>COPYRIGHT &copy; 2020 DEVBRIDGE</p>
      </footer>
    </div>
  );
};
export default MainLayout;
