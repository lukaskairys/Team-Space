import { isUnavailable } from "./dateFormatters";

export default function dataFilter(
  data,
  tags,
  searchTerm,
  date,
  availabilityOn
) {
  const searchableProperties = ["name", "brand"];
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
          if (tags[tag].includes(item[tag])) {
            return item;
          } else return null;
        });
      }
    }
  };

  const filterByAvailability = () => {
    filterData = filterData.filter((item) => {
      const itemUnavailable =
        isUnavailable(date, item.bookedUntil) || item.quantity === 0;
      if (availabilityOn && itemUnavailable) return null;
      else return item;
    });
  };

  filterBySearchTerm();
  filterByTags();
  filterByAvailability();

  return filterData;
}
