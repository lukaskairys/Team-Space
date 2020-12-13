import { useState, useEffect } from "react";
import axios from "axios";
import jsonserver from "./jsonserver";

export const useRequest = (endpoint) => {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    setMounted(true);
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await jsonserver.get(endpoint, {
          cancelToken: source.token,
        });
        setData(data);
        setIsLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        } else {
          setIsLoading(false);
          setError(error);
        }
      }
    };

    if (mounted) fetchData();

    return () => {
      source.cancel();
      setMounted(false);
    };
  }, [endpoint, mounted]);
  return { data, error, isLoading };
};
