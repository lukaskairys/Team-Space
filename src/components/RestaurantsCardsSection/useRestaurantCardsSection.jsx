import { useState, useEffect, useContext, useRef, useCallback } from "react";

import { isObjectEmpty } from "utils/objects";
import { toggleAnimation } from "../../utils/toggleAnimation";
import useObserver from "../../utils/useObserver";
import { FilterByMode } from "./utils/filterByMode";
import { LayoutHandler } from "./handleLayout";
import { useParams } from "react-router-dom";
import { Context } from "../../contexts/Context";

import useCurrentLocation from "../../utils/useCurrentLocation";
import { geolocationOptions } from "../../utils/geolocationOptions";

const useRestaurantCardsSection = (sectionRef, listRef, mode) => {
  const { data, error } = useContext(Context);
  const { location } = useCurrentLocation(geolocationOptions);
  const [currentPage, setCurrentPage] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const itemsPerPage = LayoutHandler(containerWidth);
  const filteredData = useRef(null);
  const animationLoading = useRef(false);

  const [visibleData, setVisibleData] = useState([]);
  const { id } = useParams("id");

  const prevId = useRef(id);
  let prevItemsPerPage = useRef(itemsPerPage);
  const imagesLoaded = useRef(0);

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
      const restaurants = data;
      prevId.current = id;
      // filtering data by mode { near you, you could also like, new restaurants }
      filteredData.current = FilterByMode(mode, restaurants, id, location);
    }
  }, [data, id, location, mode]);

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
    if (!isObjectEmpty(data)) {
      //set filtered data on first load
      handleDataFiltering();
      setVisibleData(slicePart(filteredData.current));
    }
  }, [data, currentPage, itemsPerPage, handleDataFiltering]);

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

  return {
    data,
    visibleData,
    getTotalPages,
    currentPage,
    paginate,
    error,
    handleImageLoad,
  };
};

export default useRestaurantCardsSection;
