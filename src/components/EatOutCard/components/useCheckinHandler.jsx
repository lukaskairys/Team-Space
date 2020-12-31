import { useContext, useState, useEffect, useCallback } from "react";

import { isObjectEmpty } from "../../../utils/objects";
import { UserContext } from "../../../contexts/UserContext";
import useCurrentTime from "../../../utils/useCurrentTime";
import { infoToast } from "../../Toasts/ToastHandler";
import { patch, put, putCollection } from "../../../apis/services";

const useCheckinHandler = (restaurant) => {
  const {
    data,
    users,
    isClearingNow,
    lastClearDate,
    setCurrentCheckIn,
    currentCheckIn,
  } = useContext(UserContext);

  const [active, setActive] = useState(false);
  const [checkIns, setCheckIns] = useState(0);
  const currenTime = useCurrentTime();
  const clearTime = "0:00";

  const toggleCheckIn = () => {
    active === true ? remove(data) : add(data, restaurant);
    setActive(!active);
  };

  const isRecheckining = (userCheckIn) => {
    if (!isObjectEmpty(userCheckIn))
      infoToast(`You have rechecked to ${restaurant.name}`);
  };

  const update = (user) => {
    users.find((thisUser) => thisUser.id === user.id).checkIn = user.checkIn;
    patch("/users", data, data.id);
    setCurrentCheckIn(user.checkIn);
  };

  const remove = (user) => {
    user.checkIn = {};
    update(user);
  };

  const add = (user, restaurant) => {
    isRecheckining(user.checkIn);
    user.checkIn = { id: restaurant.id };
    update(user);
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

  const EndOfDayHandler = useCallback(() => {
    const updateClearDate = (newClearDate) => {
      putCollection("/lastClearDate", newClearDate);
      if (lastClearDate.date !== newClearDate.date) {
        lastClearDate.date = newClearDate.date;
      }
    };

    const isClearedToday = (currentDate) => {
      if (isObjectEmpty(lastClearDate)) return true;

      return currentDate === lastClearDate.date ? true : false;
    };

    if (isObjectEmpty(users)) return;

    const currentDate = new Date()
      .toLocaleString("LT", { timeZone: "EET" })
      .substring(0, 10);

    if (
      (currenTime === clearTime || !isClearedToday(currentDate)) &&
      isClearingNow.current !== true
    ) {
      users.forEach((user) => {
        user.checkIn = {};
        put("/users", user, user.id);
      });
      const newClearDate = { date: currentDate };
      updateClearDate(newClearDate);
      data.checkIn = {};
      isClearingNow.current = true;
    }
  }, [currenTime, data, users, lastClearDate, isClearingNow]);

  useEffect(() => {
    EndOfDayHandler();
    if (!isObjectEmpty(data) || !isObjectEmpty(restaurant)) {
      InitialHandler(restaurant.id, data);
    }
  }, [
    data,
    restaurant,
    InitialHandler,
    EndOfDayHandler,
    currentCheckIn,
    active,
  ]);

  return { toggleCheckIn, checkIns, active };
};

export default useCheckinHandler;
