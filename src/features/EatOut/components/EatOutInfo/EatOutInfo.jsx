import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { Context } from "contexts/Context";
import { isObjectEmpty } from "utils/objects";
import { ReactComponent as PinIcon } from "assets/icons/map-pin.svg";
import { ReactComponent as GlobeIcon } from "assets/icons/globe.svg";
import { ReactComponent as PhoneIcon } from "assets/icons/phone.svg";
import { ReactComponent as ClockIcon } from "assets/icons/clock.svg";
/* import Map from "features/EatOut/components/Map/Map"; */
import MapBox from "features/EatOut/components/Map/MapBox";

import "./EatOutInfo.scss";

const EatOutInfo = () => {
  const { id } = useParams();
  const { data, error } = useContext(Context);

  if (!isObjectEmpty(data)) {
    const restaurant = data
      .filter((restaurant) => restaurant.id === id)
      .shift();

    const renderHours = () => {
      return restaurant.openingHours.map((timeInfo, index) => {
        return (
          <React.Fragment key={index}>
            <span>{timeInfo.days}&nbsp;&nbsp;</span>
            <span>
              {timeInfo.hours
                .split(" - ")
                .map((s) => {
                  return s.length > 2 ? s : s + ":00";
                })
                .join(" - ")}
            </span>
          </React.Fragment>
        );
      });
    };

    return (
      <article className="eat-out-info">
        <h2 className="eat-out-info__header">Information</h2>
        <div className="eat-out-info__content">
          <section className="eat-out-info__content-item">
            <PinIcon className="eat-out-info__icon" />
            <h3 className="eat-out-info__content-header">Address</h3>
            <p className="eat-out-info__content-info">{restaurant.address}</p>
          </section>
          <section className="eat-out-info__content-item">
            <GlobeIcon className="eat-out-info__icon" />
            <h3 className="eat-out-info__content-header">Website</h3>
            <a className="eat-out-info__content-info" href={restaurant.website}>
              {restaurant.website.replace(/www.|http:\/\/|https:\/\//gi, "")}
            </a>
          </section>
          <section className="eat-out-info__content-item">
            <PhoneIcon className="eat-out-info__icon" />
            <h3 className="eat-out-info__content-header">Phone number</h3>
            <p className="eat-out-info__content-info">{restaurant.phone}</p>
          </section>
          <section className="eat-out-info__content-item">
            <ClockIcon className="eat-out-info__icon" />
            <h3 className="eat-out-info__content-header">Work hours</h3>
            <p className="eat-out-info__content-info eat-out-info__content-info--hours">
              {renderHours()}
            </p>
          </section>
        </div>
        <h2 className="eat-out-info__header">Location</h2>
        <MapBox location={restaurant} />
      </article>
    );
  } else if (error) {
    return null;
  }
  return null;
};

export default EatOutInfo;
