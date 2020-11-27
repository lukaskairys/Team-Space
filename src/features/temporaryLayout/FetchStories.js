import { useEffect, useState } from "react";
import { GetApiURL } from "../../utils/Api";

const FetchStories = () => {
  const API_URL = GetApiURL("stories");
  const [stories, setStories] = useState([]);

  const fetchAPI = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((allStories) => {
        setStories(allStories);
      });
  };

  useEffect(fetchAPI, [API_URL]);
  return stories;
};

export default FetchStories;
