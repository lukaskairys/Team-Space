import jsonserver from "./jsonserver";

export const post = async (endpoint, data) => {
  await jsonserver.post(endpoint, data);
};
