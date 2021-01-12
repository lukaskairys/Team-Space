import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import ReservationCard from "components/ReservationCard/ReservationCard";

import { successToast } from "components/Toasts/ToastHandler";
import { constructRenderable } from "utils/constructReservationList";
import { patch } from "apis/services";

import "./reservedItems.scss";

const ReservedItems = ({
  reservedItems,
  setReservedItems,
  allItems,
  title,
  name,
  listName,
  user,
  setRepeatRequest,
}) => {
  const [reservedItemsDataList, setReservedItemsDataList] = useState([]);

  useEffect(() => {
    if (allItems && allItems[listName]) {
      let filtered = [];

      reservedItems.forEach((resItem) => {
        filtered = [
          ...filtered,
          ...allItems[listName].filter((i) => i.id === resItem.id),
        ];
      });
      setReservedItemsDataList([...reservedItemsDataList, ...filtered]);
    }
    // eslint-disable-next-line
  }, [reservedItems, listName, allItems]);

  const updatedReservations = (id) => ({
    ...user.reservations,
    [name]: reservedItems.filter((item) => item.id !== id),
  });

  useEffect(() => {
    setRepeatRequest(true);
  }, [reservedItems, setRepeatRequest]);

  const cancelReservation = (id) => {
    setReservedItems(reservedItems.filter((item) => item.id !== id));
    patch(`/users`, { reservations: updatedReservations(id) }, user.id);
    setRepeatRequest(id);
    successToast("Your reservation is canceled.");
    document.body.style.position = "";
    document.body.style.overflowY = "visible";
  };

  return (
    <section className="reservation-item">
      <h2 className="reservation-item__title">{title}</h2>
      {reservedItemsDataList
        .sort((first, second) => {
          return new Date(first.bookedUntil) - new Date(second.bookedUntil);
        })
        .map((item, i) => {
          const renderableItemData = constructRenderable(item, listName);
          return (
            <ReservationCard
              key={item.id}
              id={item.id}
              image={item.image}
              alt={renderableItemData.alt}
              topCaption={renderableItemData.topCaption}
              title={renderableItemData.title}
              quantityOrRating={renderableItemData.bottomCaption}
              bookedUntil={item?.bookedUntil ? item.bookedUntil : null}
              date={new Date().toISOString().split("T")[0].replace(/-/g, "/")}
              listName={listName}
              favoriteType={renderableItemData.favoriteType}
              isFromReserved={true}
              cancelReservation={cancelReservation}
            />
          );
        })}
    </section>
  );
};

ReservedItems.propTypes = {
  reservedItems: PropTypes.array,
  setReservedItems: PropTypes.func,
  allItems: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  title: PropTypes.string,
  name: PropTypes.string,
  listName: PropTypes.string,
  user: PropTypes.object,
  setRepeatRequest: PropTypes.func,
};

export default ReservedItems;
