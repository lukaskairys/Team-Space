import React, { useContext, useEffect, useState, useRef } from "react";

import { UserContext } from "contexts/UserContext";
import { useRequest } from "apis/useRequest";
import { Helmet } from "react-helmet-async";

import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import ReservationSection from "features/reservationsSection/components/ReservationsSection";
import ReservedItemsSection from "features/ReservedItems/ReservedItemsSection";
import EatOutCard from "components/EatOutCard/EatOutCard";
import EatOutSection from "features/eatOutSection/components/EatOutSection";

import "./Reservations.scss";

const Reservations = () => {
  const [reservedDevices, setReservedDevices] = useState([]);
  const [reservedBooks, setReservedBooks] = useState([]);
  const [reservedRooms, setReservedRooms] = useState([]);

  const { data: user, setRepeatRequest } = useContext(UserContext);
  const { data: devices } = useRequest("/devices");
  const { data: books } = useRequest("/books");
  const { data: rooms } = useRequest("/rooms");
  const { data: restaurants } = useRequest("/restaurants");

  const checkedIn = user?.checkIn?.id;

  useEffect(() => {
    if (user && user.reservations) {
      setReservedDevices(user.reservations.devices);
      setReservedBooks(user.reservations.books);
      setReservedRooms(user.reservations.rooms);
    }
  }, [user]);

  const resSectionIfEmpty = useRef(null);
  const devicesList = useRef(null);
  const booksList = useRef(null);
  const roomsList = useRef(null);

  const checkedInRestaurant =
    restaurants.length !== 0
      ? restaurants.filter((item) => item.id === checkedIn)
      : "";

  const renderDevices = () => {
    if (reservedDevices && reservedDevices.length > 0)
      return (
        <section className="reservation-item" ref={devicesList}>
          <ReservedItemsSection
            reservedItems={reservedDevices}
            setReservedItems={setReservedDevices}
            allItems={devices}
            listName={"deviceList"}
            title={"Devices"}
            name={"devices"}
            user={user}
            setRepeatRequest={setRepeatRequest}
          />
        </section>
      );
  };
  const renderBooks = () => {
    if (reservedBooks && reservedBooks.length > 0)
      return (
        <section className="reservation-item" ref={booksList}>
          <ReservedItemsSection
            reservedItems={reservedBooks}
            setReservedItems={setReservedBooks}
            allItems={books}
            listName={"bookList"}
            title={"Books"}
            name={"books"}
            user={user}
            setRepeatRequest={setRepeatRequest}
          />
        </section>
      );
  };
  const renderRooms = () => {
    if (reservedRooms && reservedRooms.length > 0)
      return (
        <section className="reservation-item" ref={roomsList}>
          <ReservedItemsSection
            reservedItems={reservedRooms}
            setReservedItems={setReservedRooms}
            allItems={rooms}
            listName={"roomList"}
            title={"Meeting rooms"}
            name={"rooms"}
            user={user}
            setRepeatRequest={setRepeatRequest}
          />
        </section>
      );
  };

  const renderReservations = () => {
    if (!devicesList.current && !roomsList.current && !booksList.current)
      return (
        <section
          ref={resSectionIfEmpty}
          className="reservations-page__no-reservations"
        >
          <ReservationSection
            customMessageRenderer={() => (
              <p className="reservations-page__no-reservations-message">
                <span>At the moment you have no reserved items. </span>
                <span>If you need something, make a reservation here</span>
              </p>
            )}
          />
        </section>
      );
  };

  return (
    <div className="reservations-page">
      <Helmet>
        <title>Reservations · Team Space</title>
      </Helmet>
      <Breadcrumbs />
      <h1 className="reservations-page__title">Your reservations</h1>
      <div className="reservations-page__all-reservations">
        <article className="reservations-page__reserved-items">
          {renderDevices()}
          {renderBooks()}
          {renderRooms()}
          {renderReservations()}
        </article>
        <article className="reservations-page__checked-in">
          <h3 className="reservation-item__title">Checked in:</h3>
          {checkedInRestaurant && checkedInRestaurant.length !== 0 ? (
            <EatOutCard restaurant={checkedInRestaurant[0]} />
          ) : (
            <div>
              <p className="reservations-page__no-reservations-message">
                At the moment you are not checked-in with any restaurant.
              </p>
              <EatOutSection withoutRestaurants={true} />
            </div>
          )}
        </article>
      </div>
      <div className="reservations-page__widget">
        {!resSectionIfEmpty.current && (
          <ReservationSection
            title={"Need something else? Make a new reservation"}
          />
        )}
      </div>
    </div>
  );
};

export default Reservations;
