import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import ReservationCard from "components/ReservationCard/ReservationCard";

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

  const cancelReservation = (id) => {
    setReservedItems(reservedItems.filter((item) => item.id !== id));
    setRepeatRequest(id);
    patch(`/users`, { reservations: updatedReservations(id) }, user.id);
  };

  return (
    <section className="reservation-item">
      <h3 className="reservation-item__title">{title}</h3>
      {reservedItemsDataList.map((item, index) => {
        const renderableItemData = constructRenderable(item, listName);
        return (
          <ReservationCard
            key={index}
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
