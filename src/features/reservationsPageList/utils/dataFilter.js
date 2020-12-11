import { isUnavailable } from "./dateFormatters";

export default function dataFilter(
  data,
  tags,
  searchTerm,
  date,
  availabilityOn
) {
  let filterData = data;
  searchTerm = searchTerm.toLowerCase();

  const filterBySearchTerm = () => {
    filterData = filterData.filter((object) => {
      const searchableAttributes = Object.values(object).filter(
        (value) => typeof value === "string"
      );
      const match = searchableAttributes.find((property) => {
        return property.toLowerCase().includes(searchTerm);
      });
      if (Object.values(object).includes(match)) {
        return object;
      } else return null;
    });
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
