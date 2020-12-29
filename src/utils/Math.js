export const roundNumber = (number, digitPlaces = 1) => {
  const rounded = Math.pow(10, digitPlaces);
  return (Math.round(number * rounded) / rounded).toFixed(digitPlaces);
};

export const countAverage = (array) => {
  const filteredArray = array.filter((number) => number !== undefined);

  return filteredArray.length > 0
    ? filteredArray.reduce((a, b) => a + b, 0) / filteredArray.length
    : 0;
};
