import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import PropTypes from "prop-types";
import { context } from "../../contexts/Context";
import EatOutCard from "../EatOutCard/EatOutCard";
import { useParams } from "react-router-dom";

import "./restaurantCardsSection.scss";
import SectionTitle from "./SectionTitle.jsx";
import Pagination from "../Pagination/Pagination";
import Error from "./Error";
import useObserver from "../../utils/useObserver";
import { FilterByMode } from "./FilterByMode";
import useCurrentLocation from "../../utils/useCurrentLocation";
import { geolocationOptions } from "../../utils/geolocationOptions";
import { toggleAnimation } from "../../utils/toggleAnimation";

const RestaurantCardsSection = ({ title, mode }) => {
  const { location } = useCurrentLocation(geolocationOptions);

  const [currentPage, setCurrentPage] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1440);
  const { data, error } = useContext(context);
  const [visibleData, setVisibleData] = useState([]);
  const { id } = useParams("id");
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [imageLoadCount, setImageLoadCount] = useState(0);
  const [animationLoading, setAnimationLoading] = useState(false);
  const sectionRef = useRef(null);
  const listRef = useRef(null);

  const paginate = (page) => {
    if (!animationLoading) {
      toggleAnimation(listRef);
      setAnimationLoading(true);
      setTimeout(() => {
        setCurrentPage(page);
        setAnimationLoading(false);
      }, 200);
    }
  };

  const observeWidthCallback = (width) => {
    if (width) setContainerWidth(width);
  };

  useObserver({ callback: observeWidthCallback, element: sectionRef });

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
        const expandedCardWidth = containerWidth / i;

        const smallerCardWith =
          expandedCardWidth > biggestCard ? biggestCard : expandedCardWidth;
        score += smallerCardWith / biggestCard;

        const fillScoreSmallCard = (smallerCardWith * i) / containerWidth;
        score += fillScoreSmallCard;

        if (score > maxSmallCardScore) {
          maxSmallCardScore = score;
          calculateItemsPerPage = i;
        }
      }
      const perPage = calculateItemsPerPage > 0 ? calculateItemsPerPage : 1;
      setItemsPerPage(perPage);
      return perPage;
    };

    const smallestCard = 330;
    const biggestCard = 390;
    const countOfBigCards = Math.floor(containerWidth / biggestCard); //minimum amount of cards in the page
    const countOfSmallCards = Math.floor(containerWidth / smallestCard); //maximum amount of cards in the page
    return calculateSmallCardScore(
      countOfBigCards,
      countOfSmallCards,
      biggestCard
    );
  }, [containerWidth]);

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
      const filteredData = FilterByMode(
        mode,
        data.restaurantList,
        id,
        location
      );
      const currentTotalPages = Math.ceil(filteredData.length / itemsPerPage);
      setTotalPages(currentTotalPages);
      setVisibleData(slicePart(filteredData));
    }
  }, [
    data,
    currentPage,
    calculateItemsPerPage,
    mode,
    id,
    itemsPerPage,
    location,
  ]);
  const handleImageLoad = () => {
    const imagesLoaded = imageLoadCount + 1;
    const needsToLoad = visibleData.length;
    setImageLoadCount(imagesLoaded);
    if (imagesLoaded === needsToLoad) {
      setTimeout(() => {
        toggleAnimation(listRef);
      }, 100);

      setImageLoadCount(0);
    }
  };

  if (data.restaurantList) {
    if (visibleData.length > 0) {
      return (
        <div ref={sectionRef} className="restaurant-cards-section">
          <div className="restaurant-cards-section__header">
            <SectionTitle title={title} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />
          </div>
          <div ref={listRef} className="restaurant-cards-section__list">
            {visibleData.map((restaurant) => (
              <div
                key={restaurant.id}
                className="restaurant-cards-section__single"
              >
                <EatOutCard
                  restaurant={restaurant}
                  handleImageLoad={handleImageLoad}
                />
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
