export const GetApiURL = (endpoint) => {
  const URL = "http://localhost:3008";
  const API_URL = `${URL}/${endpoint}`;
  return API_URL;
};
