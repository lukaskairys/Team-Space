import React, { useContext, useEffect, useState, useRef } from "react";

import { UserContext } from "contexts/UserContext";
import { useRequest } from "apis/useRequest";

import MainLayout from "components/MainLayout/MainLayout";
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
  const { data: user } = useContext(UserContext);
  // const reservedDevices = user?.reservations?.devices;
  // const reservedBooks = user?.reservations?.books;
  // const reservedRooms = user?.reservations?.rooms;
  const checkedIn = user?.checkIn?.id;

  const { data: devices } = useRequest("/devices");
  const { data: books } = useRequest("/books");
  const { data: rooms } = useRequest("/rooms");
  const { data: restaurants } = useRequest("/restaurants");

  useEffect(() => {
    if (user && user.reservations) {
      setReservedDevices(user.reservations.devices);
      setReservedBooks(user.reservations.books);
      setReservedRooms(user.reservations.rooms);
    }
  }, [user]);

  const resSectionIfEmpty = useRef(null);
  const reservationItem = useRef(null);
  const checkedInRestaurant =
    restaurants.length !== 0
      ? restaurants.filter((item) => item.id === checkedIn)
      : "";

  const renderDevices = () => {
    if (reservedDevices && reservedDevices.length > 0)
      return (
        <section className="reservation-item" ref={reservationItem}>
          <ReservedItemsSection
            reservedItems={reservedDevices}
            setReservedItems={setReservedDevices}
            allItems={devices}
            listName={"deviceList"}
            title={"Devices"}
            user={user}
          />
        </section>
      );
  };
  const renderBooks = () => {
    if (reservedBooks && reservedBooks.length > 0)
      return (
        <section className="reservation-item" ref={reservationItem}>
          <ReservedItemsSection
            reservedItems={reservedBooks}
            setReservedItems={setReservedBooks}
            allItems={books}
            listName={"bookList"}
            title={"Books"}
            user={user}
          />
        </section>
      );
  };
  const renderRooms = () => {
    if (reservedRooms && reservedRooms.length > 0)
      return (
        <section className="reservation-item" ref={reservationItem}>
          <ReservedItemsSection
            reservedItems={reservedRooms}
            setReservedItems={setReservedRooms}
            allItems={rooms}
            listName={"roomList"}
            title={"Meeting rooms"}
            user={user}
          />
        </section>
      );
  };

  const renderReservations = () => {
    if (!reservationItem.current)
      return (
        <section
          ref={resSectionIfEmpty}
          className="reservations-page__no-reservations"
        >
          <ReservationSection
            title={
              "At the moment you have no reserved items. If you need something, make a reservation here"
            }
          />
        </section>
      );
  };

  return (
    <div className="reservations-page">
      <MainLayout>
        <>
          <Breadcrumbs />
          <h2 className="reservations-page__title">Your reservations:</h2>
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
                  <p>You are not currently checked in a restaurant.</p>
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
        </>
      </MainLayout>
    </div>
  );
};

export default Reservations;
