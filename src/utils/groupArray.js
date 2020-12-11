export default function groupArray(arr, size) {
  let groupedArr = [];
  for (let i = 0; i < arr.length; i += size) {
    groupedArr.push(arr.slice(i, i + size));
  }
  return groupedArr;
}
