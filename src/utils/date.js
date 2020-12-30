export const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const todaysDate = () => {
  return new Date().toISOString().split("T")[0];
};
