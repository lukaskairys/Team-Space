import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import { useRequest } from "apis/useRequest";
import { UserContext } from "contexts/UserContext";

import EmptyReservations from "features/ReservedItems/EmptyReservations";
import ReservedItems from "./ReservedItems";

import "./reservedItemsSection.scss";
import ThreeDotsLoader from "loaders/ThreeDotsLoader";

const ReservedItemsSection = ({ setEmptyReservations, emptyReservations }) => {
  const [reservedDevices, setReservedDevices] = useState([]);
  const [reservedBooks, setReservedBooks] = useState([]);
  const [reservedRooms, setReservedRooms] = useState([]);
  const { data: user, isLoading, setRepeatRequest, error } = useContext(
    UserContext
  );

  const {
    data: devices,
    isLoading: loadDevices,
    error: errorDevices,
  } = useRequest("/devices");
  const { data: books, isLoading: loadBooks, error: errorBooks } = useRequest(
    "/books"
  );
  const { data: rooms, isLoading: loadRooms, error: errorRooms } = useRequest(
    "/rooms"
  );

  useEffect(() => {
    if (user && user.length !== 0 && user.reservations) {
      setReservedDevices(user.reservations.devices);
      setReservedBooks(user.reservations.books);
      setReservedRooms(user.reservations.rooms);
    }
  }, [user]);

  useEffect(() => {
    if (
      reservedDevices.length === 0 &&
      reservedBooks.length === 0 &&
      reservedRooms.length === 0
    ) {
      setEmptyReservations(true);
    } else {
      setEmptyReservations(false);
    }
  }, [reservedDevices, reservedBooks, reservedRooms, setEmptyReservations]);

  const renderDevices = () => {
    if (reservedDevices && reservedDevices.length > 0)
      return (
        <ReservedItems
          reservedItems={reservedDevices}
          setReservedItems={setReservedDevices}
          allItems={devices}
          listName={"deviceList"}
          title={"Devices"}
          name={"devices"}
          user={user}
          setRepeatRequest={setRepeatRequest}
        />
      );
  };

  const renderBooks = () => {
    if (reservedBooks && reservedBooks.length > 0)
      return (
        <ReservedItems
          reservedItems={reservedBooks}
          setReservedItems={setReservedBooks}
          allItems={books}
          listName={"bookList"}
          title={"Books"}
          name={"books"}
          user={user}
          setRepeatRequest={setRepeatRequest}
        />
      );
  };

  const renderRooms = () => {
    if (reservedRooms && reservedRooms.length > 0)
      return (
        <ReservedItems
          reservedItems={reservedRooms}
          setReservedItems={setReservedRooms}
          allItems={rooms}
          listName={"roomList"}
          title={"Meeting rooms"}
          name={"rooms"}
          user={user}
          setRepeatRequest={setRepeatRequest}
        />
      );
  };

  if (isLoading || loadDevices || loadBooks || loadRooms) {
    return (
      <div style={{ height: "924px" }}>
        <ThreeDotsLoader />
      </div>
    );
  }
  if (error || errorDevices || errorBooks || errorRooms) {
    return <p className="reserved-items__error">Failed to fetch data</p>;
  }
  return (
    <article className="reserved-items">
      {renderDevices()}
      {renderBooks()}
      {renderRooms()}
      {emptyReservations && <EmptyReservations />}
    </article>
  );
};

ReservedItemsSection.propTypes = {
  setEmptyReservations: PropTypes.func,
  emptyReservations: PropTypes.bool,
};

export default ReservedItemsSection;
