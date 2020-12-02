import { getPostTime } from "./getPostTime";

export const sortStories = (stories) => {
  if (Array.isArray(stories) && stories.length)
    return stories.sort(function (firstPost, secondPost) {
      let firstDate = getPostTime(firstPost);
      let secondDate = getPostTime(secondPost);

      return secondDate - firstDate;
    });

  return [];
};

export default sortStories;
