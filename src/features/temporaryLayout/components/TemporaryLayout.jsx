// import React from "react";
// import FeedCardVideo from "features/FeedCardVideo/components/FeedCardVideo";
// import FeedCard from "features/FeedCard/components/FeedCard";
// import BirthdayCard from "features/BirthdayCard/components/BirthdayCard";

// function TemporaryLayout() {
//   const [stories, setStories] = useState([]);
//   const [userData, setUserData] = useState([]);

//   function GetPostTime(post) {
//     if (post.type === "birthday")
//       return new Date(post.birthdayDate).setFullYear(new Date().getFullYear());

//     return new Date(post.postDate);
//   }

//   useEffect(() => {
//     fetch("http://localhost:3008/stories")
//       .then((res) => res.json())
//       .then((allStories) => {
//         let sortedUSerData  =  allStories.sort(function (firstPost, secondPost) {
//           let firstDate = GetPostTime(firstPost);
//           let secondDate = GetPostTime(secondPost);
//           console.log(firstPost);
//           return secondDate - firstDate;
//         })
//         setStories(allStories);
//       });
//   }, []);

//   useEffect(() => {
//     fetch("http://localhost:3008/userData")
//       .then((res) => res.json())
//       .then((allUserData) => {
//         setUserData(allUserData);
//       });
//   }, []);

//   // const stories = FetchStories();
//   // const userData = FetchUserData();

//   function GetPostTime(post) {
//     if (post.type === "birthday")
//       return new Date(post.birthdayDate).setFullYear(new Date().getFullYear());

//     return new Date(post.postDate);
//   }

//   return (
//     <div>
//       {stories
//         .sort(function (firstPost, secondPost) {
//           let firstDate = GetPostTime(firstPost);
//           let secondDate = GetPostTime(secondPost);

//           return secondDate - firstDate;
//         })
//         .map((story, i) => {
//           return story.type === "birthday" ? (
//             <BirthdayCard key={story.id} story={story} />
//           ) : story.type === "post" ? (
//             <FeedCard
//               key={story.id}
//               story={story}
//               userPhoto={userData.userImage}
//               userName={userData.userName}
//             />
//           ) : story.type === "video" ? (
//             <FeedCardVideo
//               key={story.id}
//               story={story}
//               userPhoto={userData.userImage}
//               userName={userData.userName}
//             />
//           ) : (
//             ""
//           );
//         })}
//     </div>
//   );
// }

// export default TemporaryLayout;
