import { distanceBetweenTwoPointsOnEarth } from "./distanceCalculator";

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
  return filtered.slice(0, 12);
};

const FetchNewPlaces = (data) => {
  const filtered = [...data];
  filtered.map(
    (single) => (single["dateToNumber"] = dateToNum(single.createdDate))
  );
  filtered.sort((b, a) => a.dateToNumber - b.dateToNumber);
  return filtered.slice(0, 12);
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
