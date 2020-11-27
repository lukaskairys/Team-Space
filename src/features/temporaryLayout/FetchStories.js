import { useEffect, useState, useCallback } from "react";
import { useRequest } from "../../apis/useRequest";
import { isObjectEmpty } from "../../utils/objects";

export const FetchStories = () => {
  const [stories, setStories] = useState([]);
  const { data } = useRequest("/stories");

  const filter = useCallback((data) => {
    if (isObjectEmpty(data)) return [];

    return data;
  }, []);

  useEffect(() => {
    setStories(filter(data));
  }, [filter, data]);

  return stories;
};

export default FetchStories;
