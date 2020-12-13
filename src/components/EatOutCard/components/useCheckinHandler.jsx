import { useContext, useState, useEffect, useCallback } from "react";

import { isObjectEmpty } from "../../../utils/objects";
import jsonserver from "../../../apis/jsonserver";
import { UserContext } from "../../../contexts/UserContext";
import { useRequest } from "../../../apis/useRequest";
import useCurrentTime from "../../../utils/useCurrentTime";
import { warnToast } from "../../Toasts/ToastHandler";

const useCheckinHandler = (restaurant) => {
  const { data, users, setCurrentCheckIn, currentCheckIn } = useContext(
    UserContext
  );
  const [active, setActive] = useState(false);
  const [checkIns, setCheckIns] = useState(0);
  const currenTime = useCurrentTime();
  const { data: lastClearDate } = useRequest("/lastClearDate", currenTime);
  const clearTime = "0:00";

  const updateDB = async (user) => {
    await jsonserver.patch(`/users/${user.id}`, user);
  };

  const updateUser = async (user, id) => {
    await jsonserver.put(`/users/${id}`, user);
  };

  const toggleCheckIn = () => {
    active === true ? remove(data) : add(data, restaurant);
    setActive(!active);
  };

  const isRecheckining = (userCheckIn) => {
    if (!isObjectEmpty(userCheckIn))
      warnToast(`You have rechecked to ${restaurant.name}`);
  };

  const remove = (user) => {
    user.checkIn = {};
    update(user);
  };

  const update = async (user) => {
    users.find((thisUser) => thisUser.id === user.id).checkIn = user.checkIn;
    await updateDB(user);
    setCurrentCheckIn(user.checkIn);
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
