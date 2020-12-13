import jsonserver from "./jsonserver";

export const put = async (endpoint, data, id) => {
  await jsonserver.put(`${endpoint}/${id}`, data);
};

export const putCollection = async (endpoint, data) => {
  await jsonserver.put(`${endpoint}`, data);
};

export const patch = async (endpoint, data, id) => {
  await jsonserver.patch(`${endpoint}/${id}`, data);
};

export const get = async (endpoint) => {
  await jsonserver.get(`${endpoint}`);
};
