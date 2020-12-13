import jsonserver from "./jsonserver";

export const patchService = async (endpoint, id, data) => {
  await jsonserver.patch(`${endpoint}/${id}`, data);
};
