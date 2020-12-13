import React, { useContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { UserContext } from "../../../contexts/UserContext";
import { isObjectEmpty } from "../../../utils/objects";
import jsonserver from "../../../apis/jsonserver";
import { useRequest } from "../../../apis/useRequest";
import useCurrentTime from "../../../utils/useCurrentTime";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./personCounter.scss";
import { ReactComponent as PersonIcon } from "assets/icons/person.svg";

const Person = ({ restaurant }) => {
  const { data, users, setCurrentCheckIn, currentCheckIn } = useContext(
    UserContext
  );
  const [active, setActive] = useState(false);
  const [checkIns, setCheckIns] = useState(0);
  const currenTime = useCurrentTime();
  const { data: lastClearDate } = useRequest("/lastClearDate", currenTime);
  const clearTime = "0:00";

  const PersonClass = classNames({
    "person-container": true,
    "person-container--active": active,
  });

  const update = async (user) => {
    await jsonserver.patch(`/users/${user.id}`, user);
  };

  const updateUser = async (user, id) => {
    await jsonserver.put(`/users/${id}`, user);
  };

  const toggleFavorite = () => {
    active === true ? remove(data) : add(data, restaurant);
    setActive(!active);
  };

  const remove = async (user) => {
    user.checkIn = {};
    await update(user);
    setCurrentCheckIn(user.checkIn);
  };

  const isRecheckining = (userCheckIn) => {
    if (!isObjectEmpty(userCheckIn))
      toast.info(
        `You have changed your checkined restaurant to ${restaurant.name}!`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
  };
  const add = async (user, restaurant) => {
    isRecheckining(user.checkIn);
    user.checkIn = { id: restaurant.id };
    await update(user);
    setCurrentCheckIn(user.checkIn);
  };

  const InitialHandler = useCallback(
    (restaurantId, userData) => {
      const InitializeCheckInCount = () => {
        if (isObjectEmpty(users)) return 0;
        return users.reduce((sum, user) => {
          return user.checkIn.id === restaurantId ? sum + 1 : sum;
        }, 0);
      };
      const newCheckIns = InitializeCheckInCount(restaurantId, users);
      setCheckIns(newCheckIns);
      if (!userData.checkIn || !restaurant) return;
      if (userData.checkIn.id === restaurantId) {
        setActive(true);
      } else setActive(false);
    },
    [restaurant, users]
  );

  const isEndOfDay = useCallback(() => {
    const updateClearDate = async (newClearDate) => {
      await jsonserver.put(`/lastClearDate/`, newClearDate);
    };

    const isClearedToday = (currentDate) => {
      if (isObjectEmpty(lastClearDate)) return true;

      return currentDate === lastClearDate.date ? true : false;
    };

    if (isObjectEmpty(users)) return;
    const currentDate = new Date().toISOString().substring(0, 10);

    if (currenTime === clearTime || !isClearedToday(currentDate)) {
      users.forEach((user) => {
        user.checkIn = {};
        updateUser(user, user.id);
      });

      const newClearDate = { date: currentDate };
      updateClearDate(newClearDate);
      data.checkIn = {};
    }
  }, [currenTime, data, lastClearDate, users]);

  useEffect(() => {
    isEndOfDay();
    if (!isObjectEmpty(data) || !isObjectEmpty(restaurant)) {
      InitialHandler(restaurant.id, data);
    }
  }, [data, restaurant, InitialHandler, isEndOfDay, currentCheckIn, active]);

  return (
    <div>
      {" "}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        transition={Zoom}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
      <div
        onClick={toggleFavorite}
        onKeyDown={toggleFavorite}
        role="button"
        tabIndex="0"
        className={PersonClass}
      >
        <div className="person-container__items">
          <PersonIcon className="person-container__icon" />
          <span className="person-container__counter">{checkIns}</span>
        </div>
      </div>
    </div>
  );
};

Person.propTypes = {
  restaurant: PropTypes.object,
};

export default Person;
