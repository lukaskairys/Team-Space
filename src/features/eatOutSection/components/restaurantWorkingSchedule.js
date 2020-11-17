export const createWorkingSchedule = (workingSchedule) => {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let schedule = [];
  let startAdding = false;

  for (let i = 0; i < workingSchedule.length; i++) {
    const daysOpen = workingSchedule[i].days.split(" - ");
    const hoursOpen = workingSchedule[i].hours.split(" - ");
    const openingHours = hoursOpen[0];
    const closingHours = hoursOpen[1];
    for (let j = 0; j < weekDays.length; j++) {
      if (daysOpen[1] === weekDays[j]) {
        addFormattedEntry(schedule, weekDays[j], openingHours, closingHours);
        startAdding = false;
      } else if (startAdding) {
        addFormattedEntry(schedule, weekDays[j], openingHours, closingHours);
      } else if (daysOpen[0] === weekDays[j]) {
        startAdding = true;
        addFormattedEntry(schedule, weekDays[j], openingHours, closingHours);
      } else {
        addFormattedEntry(schedule, weekDays[j]);
      }
    }
  }
  return schedule;
};
const addFormattedEntry = (
  schedule,
  weekDay,
  openingHours = 0,
  closingHours = 0,
  doesWork = openingHours === 0 && closingHours === 0 ? false : true
) => {
  schedule.push({
    day: weekDay,
    openingHours: parseInt(openingHours),
    closingHours: parseInt(closingHours),
    text: `${openingHours}:00 - ${closingHours}:00`,
    doesWork: doesWork,
  });
};

export const isOpen = (schedule) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const currentHours = currentDate.getHours();
  const scheduleDay = schedule[currentDate.getDay()];
  if (
    scheduleDay.doesWork &&
    scheduleDay.openingHours <= currentHours &&
    scheduleDay.closingHours > currentHours
  ) {
    return scheduleDay.text;
  }

  return findNextOpeningDate(schedule, currentDay);
};
export const findNextOpeningDate = (schedule, currentDay) => {
  let count = 0;
  while (schedule.length > count) {
    if (schedule[currentDay].doesWork)
      return count === 0
        ? `Opens today at ${schedule[currentDay].openingHours}:00`
        : `Opens at ${schedule[currentDay].day} ${schedule[currentDay].openingHours}:00`;
    if (currentDay === schedule.length - 1) {
      currentDay = 0;
    } else {
      currentDay += 1;
    }
    count++;
  }
};
