const FetchNearYou = (data, location) => {
  location = renameKey(location, "latitude", "lat");
  location = renameKey(location, "longitude", "lng");

  const filtered = [...data];
  filtered.map(
    (single) =>
      (single["distance"] = distanceBetweenTwoPointsOnEarth(
        location,
        single.coordinates,
        "km"
      ))
  );
  filtered.sort((a, b) => a.distance - b.distance);
  return filtered.slice(0, 10);
};

const FetchNewPlaces = (data) => {
  const filtered = [...data];
  filtered.map(
    (single) => (single["dateToNumber"] = dateToNum(single.createdDate))
  );
  filtered.sort((b, a) => a.dateToNumber - b.dateToNumber);
  return filtered.slice(0, 10);
};

//convert date to integer representation
function dateToNum(d) {
  d = d.split("-");
  return Number(d[0] + d[1] + d[2]);
}

//Fetching similar restaurants by having same categories
const FetchSimilar = (data, currentId) => {
  const currentRestaurant = data.find((single) => {
    return single.id === currentId;
  });

  data = data.filter((single) => {
    return (
      single.id !== currentId &&
      single.categories.some(
        (r) => currentRestaurant.categories.indexOf(r) >= 0
      )
    );
  });
  return data;
};

const clone = (obj) => Object.assign({}, obj);

const renameKey = (object, key, newKey) => {
  const clonedObj = clone(object);
  const targetKey = clonedObj[key];
  delete clonedObj[key];
  clonedObj[newKey] = targetKey;

  return clonedObj;
};

export const FilterByMode = (mode, data, currentId = null, location) => {
  if (mode === "new") return FetchNewPlaces(data);
  else if (mode === "near") return FetchNearYou(data, location);
  else if (mode === "similar") return FetchSimilar(data, currentId);
  return [];
};

//Haversine formula for calculating shortest distance over earths surface.
const distanceBetweenTwoPointsOnEarth = (firstPoint, secondPoint, unit) => {
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
