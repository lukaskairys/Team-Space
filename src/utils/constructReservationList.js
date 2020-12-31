import { FavoriteTypes } from "utils/FavoriteTypes";

export const constructRenderable = (item, listName) => {
  const renderingData = {};
  switch (listName) {
    case "deviceList":
      renderingData.alt = item.deviceType;
      renderingData.topCaption = item.brand;
      renderingData.title = item.name;
      renderingData.bottomCaption = item.quantity;
      renderingData.favoriteType = FavoriteTypes.DEVICE;
      break;
    case "bookList":
      renderingData.alt = "Book";
      renderingData.topCaption = item.author;
      renderingData.title = item.title;
      renderingData.bottomCaption = item.rating.score;
      renderingData.favoriteType = FavoriteTypes.BOOK;
      break;
    case "roomList":
      renderingData.alt = "Meeting room";
      renderingData.topCaption = item.type;
      renderingData.title = item.name;
      renderingData.bottomCaption = item.seatCount;
      renderingData.favoriteType = FavoriteTypes.ROOM;
      break;
    default:
  }
  return renderingData;
};
