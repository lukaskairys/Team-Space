export const getDateFormat = (locale) => {
  var date = new Date();
  return date.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
};
