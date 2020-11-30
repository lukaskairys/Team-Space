import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { FetchBestRateddata } from "utils/Api";
import Loader from "react-loader-spinner";
import { context } from "../../contexts/Context";
import { roundNumber } from "utils/Math";

import "./restaurantCardsSection.scss";
import SectionTitle from "./SectionTitle.jsx";
import Pagination from "../Pagination/Pagination";
import Error from "./Error";

const RestaurantCardsSection = ({ title }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const { id } = useParams();
  const { data, error } = useContext(context);

  const slicePart = (data, page) => {
    return data.slice(
      currentPage * itemsPerPage,
      itemsPerPage * page + itemsPerPage
    );
  };

  const [visibleData, setVisibleData] = useState([]);

  const paginate = (page) => {
    setCurrentPage(page);
    setVisibleData(slicePart(data.restaurantList));
  };

  useEffect(() => {
    if (data.restaurantList) {
      setVisibleData(slicePart(data.restaurantList, currentPage));
      console.log(data.restaurantList);
    }
  }, [data, currentPage]);

  if (data.restaurantList) {
    if (visibleData.length > 0) {
      return (
        <div className="restaurant-cards-section">
          <div className="restaurant-cards-section__header">
            <SectionTitle title={title} />
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(data.restaurantList.length / itemsPerPage)}
              paginate={paginate}
            />
          </div>
          <div className="restaurant-cards__list">
            {visibleData.map((restaurant) => (
              <div key={restaurant.id} className="card"></div>
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
