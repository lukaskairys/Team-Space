import jsonserver from "./jsonserver";

export const update = async (id, data, endpoint) => {
  await jsonserver.patch(`/${endpoint}/${id}`, data);
};
