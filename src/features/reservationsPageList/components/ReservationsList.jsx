import React, { useState, useEffect } from "react";

import groupArray from "utils/groupArray";

import "./reservationsList.scss";
import ReservationCard from "./ReservationCard";
import Pagination from "./Pagination";
import Tag from "./Tag";
import dataFilter from "../utils/dataFilter";
import { constructRenderable } from "../utils/constructRenderable";

function ReservationsList({
  searchTerm,
  tags,
  date,
  handleSingleTag,
  availabilityOn,
  listName,
  listData,
  counter,
}) {
  const [page, setPage] = useState(0);

  const renderTags = () => {
    const tagArr = [];
    for (const tag in tags) {
      tags[tag].forEach((item) => {
        tagArr.push(item);
      });
    }
    return tagArr.map((tag) => {
      return <Tag key={tag} name={tag} handleSingleTag={handleSingleTag} />;
    });
  };

  useEffect(() => {
    for (const tag in tags) {
      if (tags[tag].length > 0) {
        setPage(0);
      }
    }
  }, [tags]);

  if (listData) {
    const filteredData = dataFilter(
      listData,
      tags,
      searchTerm,
      date,
      availabilityOn,
      counter
    );
    const items = groupArray(filteredData, 6);
    const pageCount = items.length - 1;

    const renderCards = () => {
      if (items[page]) {
        return items[page].map((item, index) => {
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
              date={date}
              listName={listName}
              favoriteType={renderableItemData.favoriteType}
            />
          );
        });
      } else return null;
    };

    const renderCardsAndPagination = () => {
      return (
        <>
          <div className="reservations-list__cards">{renderCards()}</div>
          <Pagination page={page} setPage={setPage} pageCount={pageCount} />
        </>
      );
    };

    return (
      <div className="reservations-list">
        <div className="reservations-list__details">
          <h3 className="reservations-list__title">
            {`${filteredData.length} results${
              searchTerm === "" && renderTags().length === 0 ? "" : " for"
            }:`}
            <span className="reservations-list__search-term">{`${searchTerm}`}</span>
          </h3>
          {renderTags()}
        </div>
        {items.length > 0 ? renderCardsAndPagination() : null}
      </div>
    );
  } else return null;
}

export default ReservationsList;
