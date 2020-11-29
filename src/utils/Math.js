export const roundNumber = (number, digitPlaces = 1) => {
  const rounded = Math.pow(10, digitPlaces);
  return (Math.round(number * rounded) / rounded).toFixed(digitPlaces);
};

export const countAverage = (array) => {
  return array.length > 0 ? array.reduce((a, b) => a + b, 0) / array.length : 0;
};
