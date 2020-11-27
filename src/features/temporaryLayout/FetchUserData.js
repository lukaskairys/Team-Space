import { useEffect, useState } from "react";
import { GetApiURL } from "../../utils/Api";

const FetchUserData = () => {
  const API_URL = GetApiURL("userData");
  const [userData, setUserData] = useState([]);

  const fetchAPI = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      });
  };

  useEffect(fetchAPI, [API_URL]);
  return userData;
};

export default FetchUserData;
