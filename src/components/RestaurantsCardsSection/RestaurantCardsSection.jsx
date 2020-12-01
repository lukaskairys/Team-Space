import React, { useState, useEffect, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { context } from "../../contexts/Context";
import EatOutCard from "../EatOutCard/EatOutCard";
import { useParams } from "react-router-dom";

import "./restaurantCardsSection.scss";
import SectionTitle from "./SectionTitle.jsx";
import Pagination from "../Pagination/Pagination";
import Error from "./Error";
import { useCurrentWidth } from "./useCurrentWidth";
import { FilterByMode } from "./FilterByMode";

const RestaurantCardsSection = ({ title, mode }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [width, ref] = useCurrentWidth();
  const { data, error } = useContext(context);
  const [visibleData, setVisibleData] = useState([]);
  const { id } = useParams("id");
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const paginate = (page) => {
    setCurrentPage(page);
  };

  const calculateItemsPerPage = useCallback(() => {
    const calculateSmallCardScore = (
      countOfBigCards,
      countOfSmallCards,
      biggestCard
    ) => {
      let maxSmallCardScore = 0;
      let calculateItemsPerPage = 0;
      for (let i = countOfBigCards; i <= countOfSmallCards; i++) {
        let score = 0;
        const expandedCardWidth = width / i;

        const smallerCardWith =
          expandedCardWidth > biggestCard ? biggestCard : expandedCardWidth;
        score += smallerCardWith / biggestCard;

        const fillScoreSmallCard = (smallerCardWith * i) / width;
        score += fillScoreSmallCard;

        if (score > maxSmallCardScore) {
          maxSmallCardScore = score;
          calculateItemsPerPage = i;
        }
      }

      setItemsPerPage(calculateItemsPerPage);
      return calculateItemsPerPage;
    };
    const smallestCard = 250;
    const biggestCard = 390;
    const countOfBigCards = Math.floor(width / biggestCard); //minimum amount of cards in the page
    const countOfSmallCards = Math.floor(width / smallestCard); //maximum amount of cards in the page
    return calculateSmallCardScore(
      countOfBigCards,
      countOfSmallCards,
      biggestCard
    );
  }, [width]);

  useEffect(() => {
    const slicePart = (data) => {
      const index = currentPage * itemsPerPage;
      const currentItemsPerPage = calculateItemsPerPage();
      const newCurrentPage = Math.floor(index / currentItemsPerPage);
      setCurrentPage(newCurrentPage);
      return data.slice(
        newCurrentPage * currentItemsPerPage,
        currentItemsPerPage * newCurrentPage + currentItemsPerPage
      );
    };

    if (data.restaurantList) {
      const filteredData = FilterByMode(mode, data.restaurantList, id);
      const currentTotalPages = Math.ceil(filteredData.length / itemsPerPage);
      setTotalPages(currentTotalPages);
      setVisibleData(slicePart(filteredData));
    }
  }, [data, currentPage, width, calculateItemsPerPage, mode, id, itemsPerPage]);

  if (data.restaurantList) {
    if (visibleData.length > 0) {
      return (
        <div ref={ref} className="restaurant-cards-section">
          <div className="restaurant-cards-section__header">
            <SectionTitle title={title} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
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
    } else return <Error message={"No restaurants to suggest"} />;
  } else if (error) {
    return <Error message={"Failed to fetch  restaurants"} />;
  }
  return "";
};

RestaurantCardsSection.propTypes = {
  title: PropTypes.string,
  mode: PropTypes.string,
};

export default RestaurantCardsSection;
