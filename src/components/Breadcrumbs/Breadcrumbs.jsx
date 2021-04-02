import React from "react";
import classNames from "classnames";
import { Link, useParams } from "react-router-dom";

import { isObjectEmpty } from "utils/objects";
import { useRequest } from "apis/useRequest";
import { ReactComponent as Arrow } from "assets/icons/right.svg";

import "./Breadcrumbs.scss";

const Breadcrumbs = () => {
  const pathNames = window.location.pathname.split("/").filter((x) => x);
  const { id } = useParams();
  const { data, error } = useRequest("/restaurants");

  if (!isObjectEmpty(data)) {
    const restaurant = data
      .filter((restaurant) => restaurant.id === id)
      .shift();

    return (
      <nav className="breadcrumbs" aria-label="Secondary">
        <Link className="breadcrumbs__item" to="/Team-Space">
          dashboard
        </Link>
        {pathNames.map((pathItem, index) => {
          const routeTo = `/${pathNames.slice(0, index + 1).join("/")}`;

          if (id === pathItem) {
            pathItem = restaurant.name;
          }

          if (pathItem !== "categories") {
            return (
              <React.Fragment key={index}>
                <Arrow className="breadcrumbs__icon" />
                <Link
                  className={classNames("breadcrumbs__item", {
                    "breadcrumbs__item--last":
                      pathItem === pathNames[pathNames.length - 1] ||
                      !pathNames.includes(pathItem),
                  })}
                  to={routeTo}
                >
                  {pathItem}
                </Link>
              </React.Fragment>
            );
          }
          return <React.Fragment key={index} />;
        })}
      </nav>
    );
  } else if (error) {
    return null;
  }
  return <div className="breadcrumbs__placeholder"></div>;
};

export default Breadcrumbs;
