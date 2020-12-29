import { isUnavailable } from "./dateFormatters";
import { roundNumber } from "utils/Math";

export default function dataFilter(
  data,
  tags,
  searchTerm,
  date,
  availabilityOn,
  favoritesOn,
  userData,
  endpoint,
  count
) {
  const searchableProperties = ["name", "brand", "title", "author"];

  let filterData = data;
  searchTerm = searchTerm.toLowerCase();

  const filterBySearchTerm = () => {
    let terms = searchTerm.split(" ");

    terms.forEach((term) => {
      filterData = searchByTerms(filterData, term);
    });
  };

  const searchByTerms = (array, term) => {
    return array.filter((object) => {
      const searchableAttributes = findPropertiesToSearch(object);
      const match = searchableAttributes.find((property) => {
        return property.toLowerCase().includes(term);
      });
      if (match !== undefined) {
        return object;
      } else return null;
    });
  };

  const findPropertiesToSearch = (object) => {
    let searchableAttributes = [];
    Object.entries(object).forEach((object) => {
      let key = object[0];
      let value = object[1];

      if (typeof value === "string" && searchableProperties.includes(key)) {
        searchableAttributes.push(value);
      }
    });
    return searchableAttributes;
  };

  const filterByTags = () => {
    for (const tag in tags) {
      if (tags[tag].length !== 0) {
        filterData = filterData.filter((item) => {
          if (!item[tag]) return null;
          if (Array.isArray(item[tag])) return combine(tag, item);
          else return single(tag, item);
        });
      }
    }
  };
  const combine = (tag, item) => {
    if (tags[tag].every((currentTag) => item[tag].includes(currentTag))) {
      return item;
    } else return null;
  };

  const single = (tag, item) => {
    if (tags[tag].includes(item[tag])) {
      return item;
    } else return null;
  };

  const filterByAvailability = () => {
    filterData = filterData.filter((item) => {
      const itemUnavailable =
        isUnavailable(date, item.bookedUntil) || item.quantity === 0;
      if (availabilityOn && itemUnavailable) return null;
      else return item;
    });
  };

  const filterByFavorite = () => {
    if (!favoritesOn) return;

    let favorites = getFavorites();
    let favoriteIds = [];
    favorites.forEach((item) => {
      favoriteIds.push(item.id);
    });
    filterData = filterData.filter((item) => {
      if (favoriteIds.includes(item.id)) return item;
      else return null;
    });
  };

  const getFavorites = () => {
    if (endpoint === "books") return userData.liked.books;
    if (endpoint === "devices") return userData.liked.devices;
    if (endpoint === "rooms") return userData.liked.rooms;
  };

  const filterByCount = () => {
    filterData = filterData.filter((item) => {
      return item?.rating === undefined
        ? item.seatCount >= count
        : roundNumber(item.rating.score) >= count;
    });
  };

  filterBySearchTerm();
  filterByTags();
  filterByAvailability();
  filterByFavorite();
  if (filterData[0]?.rating || filterData[0]?.seatCount) filterByCount();

  return filterData;
}
