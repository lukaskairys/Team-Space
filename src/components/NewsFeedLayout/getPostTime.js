export const getPostTime = (post) => {
  if (post.type === "birthday")
    return new Date(post.birthdayDate).setFullYear(new Date().getFullYear());

  return new Date(post.postDate);
};
