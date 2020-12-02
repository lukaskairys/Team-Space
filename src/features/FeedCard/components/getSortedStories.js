import { useEffect, useState, useCallback } from "react";
import { useRequest } from "../../../apis/useRequest";
import { isObjectEmpty } from "../../../utils/objects";
import { getPostTime } from "../../../components/NewsFeedLayout/getPostTime";

export const FetchSortedStories = () => {
  const [stories, setStories] = useState([]);
  const { data } = useRequest("/stories");

  const filter = useCallback((data) => {
    if (isObjectEmpty(data)) return [];

    if (Array.isArray(data) && data.length)
      return data.sort(function (firstPost, secondPost) {
        let firstDate = getPostTime(firstPost);
        let secondDate = getPostTime(secondPost);

        return secondDate - firstDate;
      });

    return [];
  }, []);

  useEffect(() => {
    setStories(filter(data));
  }, [filter, data]);

  return stories;
};
