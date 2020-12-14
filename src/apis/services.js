import jsonserver from "./jsonserver";

export const update = async (id, data) => {
  await jsonserver.patch(`/users/${id}`, data);
};
