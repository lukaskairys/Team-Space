import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { ReactComponent as Arrow } from "assets/icons/right.svg";

import "./Breadcrumbs.scss";

const Breadcrumbs = () => {
  const pathnames = window.location.pathname.split("/").filter((x) => x);
  return (
    <nav className="breadcrumbs">
      <Link className="breadcrumbs__item" to="/">
        dashboard
      </Link>
      {pathnames.map((pathItem, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;

        return (
          <React.Fragment key={index}>
            <Arrow className="breadcrumbs__icon" />
            <Link
              className={classNames("breadcrumbs__item", {
                "breadcrumbs__item--last":
                  pathItem === pathnames[pathnames.length - 1],
              })}
              to={routeTo}
            >
              {pathItem}
            </Link>
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
