import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import ReservationCard from "features/reservationsPageList/components/ReservationCard";
import { constructRenderable } from "features/reservationsPageList/utils/constructRenderable";
import { patch } from "apis/services";

import "./reservedItemsSection.scss";

const ReservedItemsSection = ({
  reservedItems,
  setReservedItems,
  allItems,
  title,
  listName,
  user,
  setRepeat,
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
      setReservedItemsDataList(filtered);
    }
  }, [reservedItems, listName, allItems]);

  const updatedReservations = (id) => ({
    ...user.reservations,
    [title.toLowerCase()]: reservedItems.filter((item) => item.id !== id),
  });

  const cancelReservation = (id) => {
    setReservedItems(reservedItems.filter((item) => item.id !== id));
    setReservedItemsDataList(
      reservedItemsDataList.filter((item) => item.id !== id)
    );
    setRepeat(true);
    patch(`/users`, { reservations: updatedReservations(id) }, user.id);
  };

  return (
    <>
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
    </>
  );
};

ReservedItemsSection.propTypes = {
  reservedItems: PropTypes.array,
  setReservedItems: PropTypes.func,
  allItems: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  title: PropTypes.string,
  listName: PropTypes.string,
  user: PropTypes.object,
  setRepeat: PropTypes.string,
};

export default ReservedItemsSection;
