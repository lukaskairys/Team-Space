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
}) => {
  const [reservedItemsDataList, setReservedItemsDataList] = useState([]);

  useEffect(() => {
    if (allItems && allItems[listName]) {
      reservedItems.forEach((item) => {
        const filtered = allItems[listName].filter((i) => i.id === item.id);
        setReservedItemsDataList((prevItems) => [...prevItems, ...filtered]);
      });
    }
  }, [reservedItems, user, listName, allItems]);

  const updatedReservations = (id) => ({
    ...user.reservations,
    [title.toLowerCase()]: reservedItems.filter((item) => item.id !== id),
    // .map((item) => ({
    //   id: item.id,
    // })),
  });

  const cancelReservation = (id) => {
    setReservedItems(reservedItems.filter((item) => item.id !== id));
    setReservedItemsDataList(
      reservedItemsDataList.filter((item) => item.id !== id)
    );

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
};

export default ReservedItemsSection;
