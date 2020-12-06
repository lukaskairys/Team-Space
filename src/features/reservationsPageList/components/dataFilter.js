export default function dataFilter(data, tags, searchTerm) {
  let filterData = data;
  searchTerm = searchTerm.toLowerCase();

  const filterBySearchTerm = () => {
    filterData = filterData.filter((object, index) => {
      const match = Object.values(object).find((property) => {
        if (typeof property === "string") {
          return property.toLowerCase().includes(searchTerm);
        } else return null;
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

  filterByTags();
  filterBySearchTerm();

  return filterData;
}
