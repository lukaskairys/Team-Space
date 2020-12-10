export const isObjectEmpty = (objectData) => {
  if (Object.keys(objectData).length === 0 && objectData.constructor === Object)
    return true;

  return false;
};

export const getObjectEntries = (object) => {
  if (object !== undefined && !isObjectEmpty(object))
    return Object.entries(object);
};
