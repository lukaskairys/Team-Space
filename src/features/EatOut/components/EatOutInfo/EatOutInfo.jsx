import React from "react";

import { useRequest } from "apis/useRequest";
import { ReactComponent as PinIcon } from "assets/icons/map-pin.svg";
import { ReactComponent as GlobeIcon } from "assets/icons/globe.svg";
import { ReactComponent as PhoneIcon } from "assets/icons/phone.svg";
import { ReactComponent as ClockIcon } from "assets/icons/clock.svg";

import "./EatOutInfo.scss";

const EatOutInfo = () => {
  const { data } = useRequest("/restaurants");
  const restaurantId = 0;

  if (!data.restaurantList) {
    return <div>Loading...</div>;
  }
  return (
    <div className="eat-out-info">
      <h2 className="eat-out-info__header">Information</h2>
      <div className="eat-out-info__content">
        <div className="eat-out-info__content-item">
          <PinIcon className="eat-out-info__icon" />
          <h3 className="eat-out-info__content-header">Address</h3>
          <p className="eat-out-info__content-info">
            {data.restaurantList[restaurantId].address}
          </p>
        </div>
        <div className="eat-out-info__content-item">
          <GlobeIcon className="eat-out-info__icon" />
          <h3 className="eat-out-info__content-header">Website</h3>
          <a
            className="eat-out-info__content-info"
            href={data.restaurantList[restaurantId].website}
          >
            {data.restaurantList[restaurantId].website.replace(
              /www.|http:\/\/|https:\/\//gi,
              ""
            )}
          </a>
        </div>
        <div className="eat-out-info__content-item">
          <PhoneIcon className="eat-out-info__icon" />
          <h3 className="eat-out-info__content-header">Phone number</h3>
          <p className="eat-out-info__content-info">
            {data.restaurantList[restaurantId].phone}
          </p>
        </div>
        <div className="eat-out-info__content-item">
          <ClockIcon className="eat-out-info__icon" />
          <h3 className="eat-out-info__content-header">Work hours</h3>
          <p className="eat-out-info__content-info">
            {data.restaurantList[restaurantId].openingHours[0].days}&nbsp;
            {data.restaurantList[restaurantId].openingHours[0].hours
              .split(" - ")
              .map((s) => {
                return s.length > 2 ? s : s + ":00";
              })
              .join(" - ")}
          </p>
        </div>
      </div>
      <h2 className="eat-out-info__header">Location</h2>
    </div>
  );
};

export default EatOutInfo;
