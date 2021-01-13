const cacheImages = async (restaurants) => {
  const promises = await restaurants.map((restaurant) => {
    return new Promise(function (resolve, reject) {
      const img = new Image();
      img.src = restaurant.image;
      img.onload = resolve();
      img.onerror = reject();
    });
  });
  await Promise.all(promises);
};
export default cacheImages;
