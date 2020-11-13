export const isObjectEmpty = (objectData) => {
  if (Object.keys(objectData).length === 0 && objectData.constructor === Object)
    return true;

  return false;
};
