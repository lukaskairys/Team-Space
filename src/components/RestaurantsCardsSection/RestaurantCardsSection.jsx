import React, { useState, useEffect, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";
import { context } from "../../contexts/Context";
import EatOutCard from "../EatOutCard/EatOutCard";

import "./restaurantCardsSection.scss";
import SectionTitle from "./SectionTitle.jsx";
import Pagination from "../Pagination/Pagination";
import Error from "./Error";
import { useCurrentWidth } from "./useCurrentWidth";

const RestaurantCardsSection = ({ title }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [width, ref] = useCurrentWidth();

  const { data, error } = useContext(context);

  const [visibleData, setVisibleData] = useState([]);

  const paginate = (page) => {
    setCurrentPage(page);
  };

  const itemsPerPage = useCallback(() => {
    const cardSize = 250 + 30;
    return Math.floor(width / cardSize);
  }, [width]);

  useEffect(() => {
    const slicePart = (data, page) => {
      return data.slice(
        currentPage * itemsPerPage(),
        itemsPerPage() * page + itemsPerPage()
      );
    };

    if (data.restaurantList) {
      setVisibleData(slicePart(data.restaurantList, currentPage));
    }
  }, [data, currentPage, width, itemsPerPage]);

  if (data.restaurantList) {
    if (visibleData.length > 0) {
      return (
        <div ref={ref} className="restaurant-cards-section">
          <div className="restaurant-cards-section__header">
            <SectionTitle title={title} />
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(
                data.restaurantList.length / itemsPerPage()
              )}
              paginate={paginate}
            />
          </div>
          <div className="restaurant-cards-section__list">
            {visibleData.map((restaurant) => (
              <div
                key={restaurant.id}
                className="restaurant-cards-section__single"
              >
                <EatOutCard restaurant={restaurant} />
              </div>
            ))}
          </div>
        </div>
      );
    } else return <Error message={"Restaurant not found"} />;
  } else if (error) {
    return <Error message={"Failed to fetch a restaurant"} />;
  }
  return (
    <div className="HERO__loader">
      <Loader type="TailSpin" color="#6e44ff" height={70} width={70} />
    </div>
  );
};

RestaurantCardsSection.propTypes = {
  title: PropTypes.string,
};

export default RestaurantCardsSection;
