import images from "./weatherConditions";

export const translateIdToImage = (id, currentTime, cloudStatus) => {
  const conditions = images.WeatherConditions;
  const dayStatus = isNightTime(currentTime);
  const imgObj = { shift: 0 };
  if (id >= 200 && id < 300) {
    shiftLeft(imgObj);
    return setImage(imgObj, conditions.thunderstorm, dayStatus);
  }
  if ((id >= 300 && id < 400) || (id >= 500 && id < 600)) {
    shiftRightNight(imgObj, dayStatus);
    return setImage(imgObj, conditions.rainy, dayStatus);
  }
  if (id >= 600 && id < 700)
    return setImage(imgObj, conditions.snow, dayStatus, true);
  if (id >= 700 && id < 800) return setImage(imgObj, conditions.fog, dayStatus);
  if (id === 800) {
    shiftRightNight(imgObj, dayStatus);
    return setImage(imgObj, conditions.sunny, dayStatus);
  }

  return setImageByCloudStatus(
    imgObj,
    conditions.cloudy,
    dayStatus,
    cloudStatus
  );
};

const setImageByCloudStatus = (imgObj, image, dayStatus, cloudStatus) => {
  if (dayStatus) return setImage(imgObj, image, image.length - 1);
  else if (cloudStatus > 25) return setImage(imgObj, image[0]);
  else return setImage(imgObj, image[1]);
};

const shiftLeft = (imgObj) => {
  return (imgObj.shift = 1);
};

const shiftRightNight = (imgObj, dayStatus) => {
  return dayStatus === 1 ? (imgObj.shift = -1) : imgObj;
};

const setImage = (imgObj, image, dayStatus) => {
  imgObj.image = Array.isArray(image) ? image[dayStatus] : image;
  return imgObj;
};

const isNightTime = (currentTime) => {
  const nightStart = 20;
  const nightEnd = 5;
  const [hours] = currentTime.split(":");

  if (hours >= nightEnd && hours < nightStart) return 0;

  return 1;
};
