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
  var schedule = [];
  var startAdding = false;
  for (var i = 0; i < workingSchedule.length; i++) {
    var daysOpen = workingSchedule[i].days.split(" - ");
    var hoursOpen = workingSchedule[i].hours.split(" - ");
    var openingHours = hoursOpen[0];
    var closingHours = hoursOpen[1];
    for (var j = 0; j < weekDays.length; j++) {
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
  var currentDay = currentDate.getDay();
  var currentHours = currentDate.getHours();
  var scheduleDay = schedule[currentDate.getDay()];
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
  var cnt = 0;
  while (schedule.length > cnt) {
    if (schedule[currentDay].doesWork)
      return cnt === 0
        ? `Opens today at ${schedule[currentDay].openingHours}:00`
        : `Opens at ${schedule[currentDay].day} ${schedule[currentDay].openingHours}:00`;
    if (currentDay === schedule.length - 1) {
      currentDay = 0;
    } else {
      currentDay += 1;
    }
    cnt++;
  }
};
