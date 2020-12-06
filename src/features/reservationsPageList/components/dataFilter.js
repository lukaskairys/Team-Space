export default function dataFilter(data, tags) {
  let filterData = data;

  for (const tag in tags) {
    if (tags[tag].length !== 0) {
      filterData = filterData.filter((item) => {
        if (tags[tag].includes(item[tag])) {
          return item;
        } else return null;
      });
    }
  }

  return filterData;
}
