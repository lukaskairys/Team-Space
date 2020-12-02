export const getBirthdayDate = (date) => {
  var getMonth = new Intl.DateTimeFormat("en", { month: "short" });
  var month = getMonth.format(new Date(date));
  var day = new Date(date).getUTCDate();

  const nth = (d) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  return ` ${month} ${day}${nth(day)}`;
};
