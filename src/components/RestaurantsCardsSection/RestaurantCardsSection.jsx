import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
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
import { LayoutHandler } from "./LayoutHandler";

const RestaurantCardsSection = ({ title, mode }) => {
  const { data, error } = useContext(context);
  const { location } = useCurrentLocation(geolocationOptions);
  const [currentPage, setCurrentPage] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const itemsPerPage = LayoutHandler(containerWidth);

  const [visibleData, setVisibleData] = useState([]);
  const { id } = useParams("id");

  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const filteredData = useRef(null);
  const animationLoading = useRef(false);
  const cardRef = useRef(null);
  const imagesLoaded = useRef(0);
  const prevId = useRef(id);
  let prevItemsPerPage = useRef(itemsPerPage);

  //callback from custom resize hook
  const observeWidthCallback = (width) => {
    if (width) setContainerWidth(width);
  };

  //custom hook for listening to resize of the container
  useObserver({ callback: observeWidthCallback, element: sectionRef });

  //pagination method - sets current animation and toggles fade out animation loading.
  const paginate = (page) => {
    if (!animationLoading.current) {
      toggleAnimation(listRef);
      animationLoading.current = true;

      setTimeout(function () {
        setCurrentPage(page);
      }, 250);
    }
  };

  //filter data only on page change or first load.
  const handleDataFiltering = useCallback(() => {
    if (!filteredData.current || prevId.current !== id) {
      const restaurants = data.restaurantList;
      prevId.current = id;
      // filtering data by mode { near you, you could also like, new restaurants }
      filteredData.current = FilterByMode(mode, restaurants, id, location);
    }
  }, [data.restaurantList, id, location, mode]);

  useEffect(() => {
    const slicePart = (data) => {
      const index = currentPage * prevItemsPerPage.current;
      const newCurrentPage = Math.floor(index / itemsPerPage);
      setCurrentPage(newCurrentPage);
      prevItemsPerPage.current = itemsPerPage;

      return data.slice(
        newCurrentPage * itemsPerPage,
        itemsPerPage * newCurrentPage + itemsPerPage
      );
    };
    if (data.restaurantList) {
      //set filtered data on first load
      handleDataFiltering();
      setVisibleData(slicePart(filteredData.current));
    }
  }, [data.restaurantList, currentPage, itemsPerPage, handleDataFiltering]);

  const getTotalPages = () => {
    return Math.ceil(filteredData.current.length / itemsPerPage);
  };

  //listen to the img load event - starts fade in animation when all images load.
  const handleImageLoad = () => {
    imagesLoaded.current = imagesLoaded.current + 1;
    if (imagesLoaded.current >= visibleData.length) {
      if (animationLoading.current) {
        toggleAnimation(listRef);
      }
      animationLoading.current = false;
      imagesLoaded.current = 0;
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
              totalPages={getTotalPages()}
              paginate={paginate}
            />
          </div>
          <div ref={listRef} className="restaurant-cards-section__list">
            {visibleData.map((restaurant) => (
              <div
                key={restaurant.id}
                className="restaurant-cards-section__single"
                ref={cardRef}
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
    } else return <Error message={"No restaurants matched"} />;
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
