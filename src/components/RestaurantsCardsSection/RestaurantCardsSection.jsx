import React, { useRef } from "react";
import PropTypes from "prop-types";

import EatOutCard from "../EatOutCard/EatOutCard";

import "./restaurantCardsSection.scss";
import SectionTitle from "./SectionTitle.jsx";
import Pagination from "../Pagination/Pagination";
import Error from "./Error";
import RestaurantCardsSectionLoader from "loaders/RestaurantCardsSectionLoader";
import useRestaurantCardsSection from "./useRestaurantCardsSection";

const RestaurantCardsSection = ({ title, mode }) => {
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const cardRef = useRef(null);

  const {
    data,
    visibleData,
    getTotalPages,
    currentPage,
    paginate,
    error,
    handleImageLoad,
  } = useRestaurantCardsSection(sectionRef, listRef, mode);

  if (data.length === 0) {
    return <RestaurantCardsSectionLoader />;
  } else if (data.length > 0) {
    if (visibleData.length > 0) {
      return (
        <article ref={sectionRef} className="restaurant-cards-section">
          <section className="restaurant-cards-section__header">
            <SectionTitle title={title} />
            {getTotalPages() > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={getTotalPages()}
                paginate={paginate}
              />
            )}
          </section>
          <ol ref={listRef} className="restaurant-cards-section__list">
            {visibleData.map((restaurant) => (
              <li
                key={restaurant.id}
                className="restaurant-cards-section__single"
                ref={cardRef}
              >
                <EatOutCard
                  restaurant={restaurant}
                  handleImageLoad={handleImageLoad}
                />
              </li>
            ))}
          </ol>
        </article>
      );
    } else return <Error message={"No restaurants matched"} />;
  } else if (error) {
    return <Error message={"Failed to fetch restaurants"} />;
  }
  return "";
};

RestaurantCardsSection.propTypes = {
  title: PropTypes.string,
  mode: PropTypes.string,
};

export default RestaurantCardsSection;
