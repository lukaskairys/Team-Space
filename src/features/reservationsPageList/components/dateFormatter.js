export function formatDateToGB(date) {
  if (Date.parse(date)) {
    const d = new Date(date);
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return Intl.DateTimeFormat("en-GB", options).format(d);
  }
  return null;
}

export function parseDateFromGB(date) {
  if (date !== null) {
    const dateParts = date.split("/");
    return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
  }
  return null;
}

export function isLater(dateString1, dateString2) {
  const dS1 = Date.parse(parseDateFromGB(dateString1));
  const dS2 = Date.parse(parseDateFromGB(dateString2));
  return dS1 > dS2;
}
