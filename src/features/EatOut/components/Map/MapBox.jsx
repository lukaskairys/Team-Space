import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";

import { ReactComponent as PinIcon } from "assets/icons/map-pin.svg";

import "./Map.scss";

const Map = ({ location }) => {
  const [viewport, setViewport] = useState({
    latitude: location.coordinates.lat,
    longitude: location.coordinates.lng,
    zoom: 17,
  });

  useEffect(() => {
    setViewport({
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
      zoom: 17,
    });
  }, [location]);

  return (
    <div className="map">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={
          "pk.eyJ1IjoibHVrYXNrYWlyeXMiLCJhIjoiY2trYjUzcjZ3MDJ6cjJ2czdvd2tzOGRobyJ9.a1eamvufakCgrhj1jYhrDA"
        }
        mapStyle="mapbox://styles/lukaskairys/ckkb8eocw41lz17jufgq1dq5b"
        width="100%"
        height="100%"
        scrollZoom={false}
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        <Marker
          latitude={location.coordinates.lat}
          longitude={location.coordinates.lng}
        >
          <figure className="pin">
            <PinIcon className="pin__icon" alt="Pin on the map." />
            <figcaption className="pin__text">{location.address}</figcaption>
          </figure>
        </Marker>
        <div style={{ position: "absolute", right: "1rem", top: "1rem" }}>
          <NavigationControl showCompass={false} />
        </div>
      </ReactMapGL>
    </div>
  );
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
