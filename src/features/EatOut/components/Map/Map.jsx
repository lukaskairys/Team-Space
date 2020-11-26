import React from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";

import { ReactComponent as PinIcon } from "assets/icons/map-pin.svg";

import "./Map.scss";

const Map = ({ location }) => {
  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyCDRxFPYq86_HUZim4xjUhjdjy4BrA_BgI",
        }}
        defaultCenter={location.coordinates}
        defaultZoom={15}
        options={{
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
            { elementType: "geometry", stylers: [{ color: "#08304b" }] },
            {
              elementType: "labels.text.stroke",
              stylers: [{ color: "#212121" }],
            },
            {
              elementType: "labels.text.fill",
              stylers: [{ color: "#746855" }],
            },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#FFFFFF" }],
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#263c3f" }],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#6b9a76" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#000000" }],
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#000000" }],
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#FFFFFF" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#000000" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ color: "#1791AB" }],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [{ color: "#f3d19c" }],
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ color: "#2f3948" }],
            },
            {
              featureType: "transit.station",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#17263c" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#cacfd5" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#212121" }],
            },
          ],
        }}
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
    <div className="pin">
      <span>
        <PinIcon className="pin__icon" />
      </span>

      <p className="pin__text">{address}</p>
    </div>
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
