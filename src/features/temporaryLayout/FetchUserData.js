import { useEffect, useState, useCallback } from "react";
import { useRequest } from "../../apis/useRequest";
import { isObjectEmpty } from "../../utils/objects";

export const FetchUserData = () => {
  const [userData, setUserData] = useState([]);
  const { data } = useRequest("/userData");

  const filter = useCallback((data, i) => {
    if (isObjectEmpty(data)) return [];

    return data;
  }, []);

  useEffect(() => {
    setUserData(filter(data));
  }, [filter, data]);

  return userData;
};

export default FetchUserData;
