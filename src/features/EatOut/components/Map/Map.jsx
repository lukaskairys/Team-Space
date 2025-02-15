import React from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";

import { ReactComponent as PinIcon } from "assets/icons/map-pin.svg";

import "./Map.scss";
import { mapStyles } from "./mapStyles";

const Map = ({ location }) => {
  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyCDRxFPYq86_HUZim4xjUhjdjy4BrA_BgI",
        }}
        defaultCenter={null}
        center={location.coordinates}
        defaultZoom={15}
        options={mapStyles}
      >
        <LocationPin
          lat={location.coordinates.lat}
          lng={location.coordinates.lng}
          address={location.address}
        />
      </GoogleMapReact>
    </div>
  );
};

const LocationPin = ({ address }) => {
  return (
    <figure className="pin">
      <PinIcon className="pin__icon" alt="Pin on the map." />
      <figcaption className="pin__text">{address}</figcaption>
    </figure>
  );
};

LocationPin.propTypes = {
  address: PropTypes.string,
};

Map.propTypes = {
  location: PropTypes.shape({
    address: PropTypes.string,
    coordinates: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
  }),
};

export default Map;
