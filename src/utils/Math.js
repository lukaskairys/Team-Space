export const roundNumber = (number, digitPlaces = 1) => {
  var rounded = Math.pow(10, digitPlaces);
  return (Math.round(number * rounded) / rounded).toFixed(digitPlaces);
};
