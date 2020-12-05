const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const createWorkingSchedule = (workingSchedule) => {
  const schedule = [];
  workingSchedule.forEach((entry) => {
    const daySheet = entry.days.split(" - ");
    const timeSheet = entry.hours.split(" - ").map((s) => {
      return s.length > 2 ? s : s + ":00";
    });

    const [dayStartWorking, dayStopWorking] = daySheet;
    const [timeStartWorking, timeStopWorking] = timeSheet;
    let startAdding = false;

    for (let i = 0; i < weekDays.length; i++) {
      const weekday = weekDays[i];
      if (weekday === dayStartWorking) {
        startAdding = true;
        addFormattedEntry(i, schedule, timeStartWorking, timeStopWorking);
      } else if (weekday === dayStopWorking) {
        startAdding = false;
        addFormattedEntry(i, schedule, timeStartWorking, timeStopWorking);
      } else if (startAdding) {
        addFormattedEntry(i, schedule, timeStartWorking, timeStopWorking);
      }
    }
  });
  return schedule;
};

const addFormattedEntry = (
  dayIndex,
  schedule,
  timeStartWorking = "",
  timeStopWorking = ""
) => {
  const [openingHours, openingMinutes] = timeStartWorking
    .split(":")
    .map(Number);
  const [closingHours, closingMinutes] = timeStopWorking.split(":").map(Number);

  schedule[dayIndex] = {
    weekday: weekDays[dayIndex],
    openingHours,
    openingMinutes,
    closingHours: closingHours === 0 ? 24 : closingHours,
    closingMinutes,
    text: `${timeStartWorking} - ${timeStopWorking}`,
  };
};

export const formatOpeningDate = (schedule) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const scheduleDay = schedule[currentDate.getDay()];
  if (isOpenNow(scheduleDay, currentHours, currentMinutes)) {
    return scheduleDay.text;
  }

  return findNextOpeningDate(
    schedule,
    currentDay,
    currentHours,
    currentMinutes
  );
};
const isOpenNow = (scheduleDay, currentHours, currentMinutes) => {
  if (!scheduleDay) return false;

  if (
    ((scheduleDay.openingHours < currentHours ||
      (scheduleDay.openingHours === currentHours &&
        scheduleDay.openingMinutes <= currentMinutes)) &&
      scheduleDay.closingHours > currentHours) ||
    (scheduleDay.closingHours === currentHours &&
      scheduleDay.closingMinutes > currentMinutes)
  ) {
    return true;
  }

  return false;
};

const willStillOpen = (scheduleDay, currentHours, currentMinutes) => {
  if (!scheduleDay) return false;

  if (
    scheduleDay.openingHours > currentHours ||
    (scheduleDay.openingHours === currentHours &&
      scheduleDay.openingMinutes > currentMinutes)
  )
    return true;

  return false;
};

const changeDay = (currentDay, schedule) => {
  if (currentDay === weekDays.length - 1) {
    currentDay = 0;
  } else {
    currentDay += 1;
  }
  return currentDay;
};

export const findNextOpeningDate = (
  schedule,
  currentDay,
  currentHours,
  currentMinutes
) => {
  if (willStillOpen(schedule[currentDay], currentHours, currentMinutes))
    return `Opens today at  ${schedule[currentDay].text.split(" - ")[0]}`;

  currentDay = changeDay(currentDay, schedule);
  let count = 0;
  while (schedule.length > count) {
    if (schedule[currentDay]) {
      return count === 0
        ? `Opens tommorow at ${schedule[currentDay].text.split(" - ")[0]}`
        : `Opens at ${schedule[currentDay].weekday} ${
            schedule[currentDay].text.split(" - ")[0]
          }`;
    }
    currentDay = changeDay(currentDay, schedule);
    count++;
  }
};
