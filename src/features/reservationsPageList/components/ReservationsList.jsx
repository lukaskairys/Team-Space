import React, { useContext, useState } from "react";

import { context } from "contexts/Context";
import groupArray from "utils/groupArray";

import "./reservationsList.scss";
import ReservationCard from "./ReservationCard";
import Pagination from "./Pagination";
import Tag from "./Tag";
import dataFilter from "./dataFilter";

function ReservationsList({ searchTerm, tags, date, handleSingleTag }) {
  const { data } = useContext(context);
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

  if (data?.deviceList) {
    const filteredData = dataFilter(data.deviceList, tags, searchTerm);
    const devices = groupArray(filteredData, 6);
    const pageCount = devices.length - 1;
    if (devices.length > 0) {
      const renderDevices = () => {
        return devices[page].map((device, index) => {
          return (
            <ReservationCard
              key={index}
              image={device.image}
              alt={device.deviceType}
              topCaption={device.brand}
              title={device.name}
              quantityOrRating={device.quantity}
              bookedUntil={device?.bookedUntil ? device.bookedUntil : null}
              date={date}
            />
          );
        });
      };

      return (
        <div className="reservations-list">
          <div className="reservations-list__details">
            <h3 className="reservations-list__title">
              {`${filteredData.length} results for:`}
              <span className="reservations-list__search-term">{`${searchTerm}`}</span>
            </h3>
            {renderTags()}
          </div>
          <div className="reservations-list__cards">{renderDevices()}</div>
          <Pagination page={page} setPage={setPage} pageCount={pageCount} />
        </div>
      );
    } else {
      return (
        <div className="reservations-list">
          <div className="reservations-list__details">
            <h3 className="reservations-list__title">
              {`${filteredData.length} results for:`}
              <span className="reservations-list__search-term">{`${searchTerm}`}</span>
            </h3>
            {renderTags()}
          </div>
        </div>
      );
    }
  } else if (data?.bookList) {
    const filteredData = dataFilter(data.bookList, tags, searchTerm);
    const books = groupArray(filteredData, 6);
    const pageCount = books.length - 1;
    if (books.length > 0) {
      const renderBooks = () => {
        return books[page].map((book, index) => {
          return (
            <ReservationCard
              key={index}
              image={book.image}
              alt={"Book"}
              topCaption={book.author}
              title={book.title}
              quantityOrRating={book.rating.score}
              bookedUntil={book?.bookedUntil ? book.bookedUntil : null}
              date={date}
              book
            />
          );
        });
      };

      return (
        <div className="reservations-list">
          <h3 className="reservations-list__title">
            {`${filteredData.length} results for:`}
            <span className="reservations-list__search-term">{`${searchTerm}`}</span>
          </h3>
          <div className="reservations-list__cards">{renderBooks()}</div>
          <Pagination page={page} setPage={setPage} pageCount={pageCount} />
        </div>
      );
    } else {
      return (
        <div className="reservations-list">
          <div className="reservations-list__details">
            <h3 className="reservations-list__title">
              {`${filteredData.length} results for:`}
              <span className="reservations-list__search-term">{`${searchTerm}`}</span>
            </h3>
            {renderTags()}
          </div>
        </div>
      );
    }
  } else {
    return null;
  }
}

export default ReservationsList;
