import React from "react";
import PropTypes from "prop-types";
import "./MainLayout.scss";
import { ReactComponent as NotificationBell } from "assets/icons/notification-bell.svg";

const creationYear = "(dark ages)";
const currentYear = new Date().getFullYear(); //getting current year
let year;
if (creationYear === currentYear) {
  year = creationYear;
} else {
  year = `${creationYear} - ${currentYear}`;
}

const MainLayout = ({ children }) => {
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
      <main className="main-layout__main">{children}</main>
      <footer className="main-layout__footer">
        <p className="main-layout__copyright">
          copyright &copy; {year} devbridge
        </p>
      </footer>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element,
};

export default MainLayout;
