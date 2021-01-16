//Haversine formula for calculating shortest distance over earths surface.
export const distanceBetweenTwoPointsOnEarth = (
  firstPoint,
  secondPoint,
  unit
) => {
  let Radius;
  switch (unit) {
    case "mile":
      Radius = 3968;
      break;
    case "km":
      Radius = 6371;
      break;
    default:
      Radius = 3968;
      break;
  }
  const rLat1 = toRad(firstPoint.lat);
  const rLon1 = toRad(firstPoint.lng);
  const rLat2 = toRad(secondPoint.lat);
  const rLon2 = toRad(secondPoint.lng);

  const dLat = rLat2 - rLat1;
  const dLon = rLon2 - rLon1;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rLat1) * Math.cos(rLat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = Radius * c;

  return d;
};

const toRad = (number) => {
  return (number * Math.PI) / 180;
};
