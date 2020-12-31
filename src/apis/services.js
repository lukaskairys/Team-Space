import jsonserver from "./jsonserver";

export const put = async (endpoint, data, id) => {
  await jsonserver.put(`${endpoint}/${id}`, data);
};

export const putCollection = async (endpoint, data) => {
  await jsonserver.put(`${endpoint}`, data);
};

export const patch = async (endpoint, data, id, config) => {
  return await jsonserver.patch(`${endpoint}/${id}`, data, config);
};

export const get = async (endpoint) => {
  return await jsonserver.get(`${endpoint}`);
};

export const post = async (endpoint, data) => {
  await jsonserver.post(endpoint, data);
};

export const deleteData = async (endpoint, data) => {
  await jsonserver.delete(`${endpoint}`, data);
};
