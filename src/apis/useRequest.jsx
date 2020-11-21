import { useState, useEffect } from "react";
import axios from "axios";
import jsonserver from "./jsonserver";

export const useRequest = (endpoint) => {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    setMounted(true);
    const fetchData = async () => {
      try {
        const { data } = await jsonserver.get(endpoint, {
          cancelToken: source.token,
        });
        setData(data);
        setIsLoaded(true);
      } catch (error) {
        setError(error);
      }
    };

    if (mounted) fetchData();

    return () => {
      source.cancel();
      setMounted(false);
    };
  }, [endpoint, mounted]);

  return { data, error, isLoaded };
};
