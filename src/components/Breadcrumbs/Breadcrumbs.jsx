import React from "react";
import classNames from "classnames";
import { Link, useParams } from "react-router-dom";

import { useRequest } from "apis/useRequest";
import { ReactComponent as Arrow } from "assets/icons/right.svg";

import "./Breadcrumbs.scss";

const Breadcrumbs = () => {
  const pathnames = window.location.pathname.split("/").filter((x) => x);
  const { id } = useParams();
  const { data, error } = useRequest("/restaurants");

  if (data.restaurantList) {
    const restaurant = data.restaurantList
      .filter((restaurant) => restaurant.id === id)
      .shift();

    return (
      <nav className="breadcrumbs">
        <Link className="breadcrumbs__item" to="/">
          dashboard
        </Link>
        {pathnames.map((pathItem, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;

          if (id === pathItem) {
            pathItem = restaurant.name;
          }

          return (
            <React.Fragment key={index}>
              <Arrow className="breadcrumbs__icon" />
              <Link
                className={classNames("breadcrumbs__item", {
                  "breadcrumbs__item--last":
                    pathItem === pathnames[pathnames.length - 1] ||
                    !pathnames.includes(pathItem),
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
  } else if (error) {
    return <div>Error</div>;
  }
  return <div></div>;
};

export default Breadcrumbs;
